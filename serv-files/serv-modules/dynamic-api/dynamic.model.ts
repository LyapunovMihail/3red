import { DYNAMIC_COLLECTION_NAME,
    DYNAMIC_UPLOADS_PATH,
    EnumDynamicImageType,
    IDynamicObject,
    IDynamicObjectCreateParameters } from './dynamic.interfaces';
import { imageSaver, thumbnailSaver, IThumbnailSize } from './../utilits/image-saver.utilits';
const ObjectId = require('mongodb').ObjectID;

export class DynamicModel {

    collectionName = DYNAMIC_COLLECTION_NAME;

    collection: any;

    constructor (public db: any) {
        this.collection = db.collection(this.collectionName);
    }

    async getObjects() {
        return await this.collection.find({}).sort({created_at: 1}).toArray();
    }

    async changeReady(id, ready) {
        if ( id ) {
            ready = typeof ready === 'number' ? ready : 0;
            let date = new Date();

            await this.collection.update({_id : ObjectId(id)}, {
                $set: {ready, last_modifyed: date}
            });

            return await this.getObjects();
        } else {
            throw new Error('Не корректно переданы параметры!');
        }
    }

    async changeDescription(id, description) {
        if ( id ) {
            let date = new Date();
            description = typeof description === 'string' ? description : '';

            await this.collection.update({_id : ObjectId(id)}, {
                $set: {description, last_modifyed: date}
            });

            return await this.getObjects();
        } else {
            throw new Error('Не корректно переданы параметры!');
        }
    }

    async deleteObject(id) {
        if (id) {
            await this.collection.deleteOne({_id : ObjectId(id) });
            return await this.getObjects();
        } else {
            throw new Error('Не корректно переданы параметры!');
        }
    }

    async setVideo(id, origin) {
        if ( id && origin && typeof origin === 'string' ) {
            let date = new Date();

            await this.collection.update({ _id : ObjectId(id)}, {
                 $set : { last_modifyed: date },
                 $push: { images : { type: EnumDynamicImageType.VIDEO, origin, thumbnail: origin } }
            });

            return await this.getObjects();
        } else {
            throw new Error('Не корректно переданы параметры!');
        }
    }

    async setObject(options: IDynamicObjectCreateParameters ) {
        if ( 'year' in options && 'month' in options && 'title' in options ) {

            let date = new Date();
            let newObject: IDynamicObject = {
                title: options.title,
                description: '',
                created_at: date,
                last_modifyed: date,
                month: options.month,
                year: options.year,
                ready: 0,
                images: []
            };

            await this.collection.insertOne(newObject);

            return await this.getObjects();
        } else {
            throw new Error('Не корректно переданы параметры!');
        }
    }

    async deleteImage(id, image, type) {
        if (id && image && type && typeof image === 'string' && image.length > 0 ) {

            let date = new Date();

            await this.collection.update({ _id: ObjectId(id)}, {
                $set : { last_modifyed: date },
                $pull: { images: { type, thumbnail: image } }
            });

            return await this.getObjects();
        } else {
            throw new Error('Не корректно переданы параметры!');
        }
    }

    async setImages(req) {
        let media: any = await this.uploadSnippetImage(req);
        let date = new Date();

        await this.collection.update({ _id : ObjectId(req.headers.id)}, {
            $set : { last_modifyed: date },
            $push: {images : { type: EnumDynamicImageType.IMAGE, origin: media.image, thumbnail: media.thumbnail } }
        });

        return await this.getObjects();
    }

    async uploadSnippetImage(req) {
        let path = DYNAMIC_UPLOADS_PATH;
        let thumbnailSize: IThumbnailSize = {
            height: '360',
            width: '480'
        };

        let image = await imageSaver(req, path, 80);
        let thumbnail = await thumbnailSaver(req, path, thumbnailSize);

        return ({
            thumbnail,
            image
        });
    }

    async getLastMonthValue() {
        let array: IDynamicObject[] = await this.getObjects();

        if ( array.length > 0 ) {
            let lastYear = array.reduce((prev, cur, index, arr) => {
                if (Number(cur.year) > Number(prev.year)) {
                    return cur;
                } else {
                    return prev;
                }
            }).year;

            let lastMonth = array.filter((val) => {
                return Number(val.year) === Number(lastYear);
            }).reduce((prev, cur, index, arr) => {
                if (Number(cur.month) > Number(prev.month)) {
                    return cur;
                } else {
                    return prev;
                }
            }).month;

            return ({ year: lastYear, month: lastMonth });

        } else {
            let date = new Date();
            return ({ year: date.getFullYear(), month: ( date.getMonth() + 1 ) });
        }
    }
}
