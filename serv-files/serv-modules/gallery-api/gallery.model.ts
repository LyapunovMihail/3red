import { imageSaver, thumbnailSaver, IThumbnailSize } from './../utilits/image-saver.utilits';
import { GALLERY_UPLOADS_PATH, GALLERY_COLLECTION_NAME, IGallerySnippet } from './gallery.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class GalleryModel {

    collectionName = GALLERY_COLLECTION_NAME;

    collection: any;

    constructor (public db: any) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(options) {
        return await this.collection.find(options).sort({order: -1}).toArray();
    }

    async setSnippet(req) {
        let media: any = await this.uploadSnippetImage(req);
        let date = new Date();
        let snippet: IGallerySnippet = {
            image: media.image,
            thumbnail: media.thumbnail,
            created_at: date,
            last_modifyed: date,
            description: '',
            name: '',
            order: 0,
            type: req.headers.type
        };

        await this.collection.insertOne(snippet);

        return await this.getSnippet({type: req.headers.type});
    }

    async updateImage(req) {
        let id = req.headers.id;
        if ( id && ObjectId.isValid(id) ) {
            let media: any = await this.uploadSnippetImage(req);
            let date = new Date();
            let options = {
                last_modifyed: date,
                image: media.image,
                thumbnail: media.thumbnail
            };
            const snippet = await this.collection.findOne({ _id : ObjectId(id) });
            await this.collection.update({ _id : ObjectId(id) }, {$set: options });
            return await this.getSnippet({type: snippet.type});
        } else {
            throw new Error('Не корректный id.');
        }
    }

    async deleteSnippet(id) {
        if ( id && ObjectId.isValid(id) ) {
            const snippet = await this.collection.findOne({ _id : ObjectId(id) });
            await this.collection.deleteOne({ _id : ObjectId(id) });
            return await this.getSnippet({type: snippet.type});
        } else {
            throw new Error('Не корректный id.');
        }
    }

    async changeDescription(id, description) {
        if ( id && ObjectId.isValid(id) && description !== undefined && typeof description === 'string' ) {
            let date = new Date();
            let options = {
                last_modifyed: date,
                description
            };
            const snippet = await this.collection.findOne({ _id : ObjectId(id) });
            await this.collection.update({ _id : ObjectId(id) }, {$set: options });
            return await this.getSnippet({type: snippet.type});
        } else {
            throw new Error('Не корректный id.');
        }
    }

    async changeName(id, name) {
        if ( id && ObjectId.isValid(id) && name !== undefined && typeof name === 'string' ) {
            let date = new Date();
            let options = {
                last_modifyed: date,
                name
            };
            const snippet = await this.collection.findOne({ _id : ObjectId(id) });
            await this.collection.update({ _id : ObjectId(id) }, {$set: options });
            return await this.getSnippet({type: snippet.type});
        } else {
            throw new Error('Не корректный id.');
        }
    }

    async changeType(id, type) {
        if ( id && ObjectId.isValid(id) && type !== undefined) {
            let date = new Date();
            let options = {
                last_modifyed: date,
                type
            };
            await this.collection.update({ _id : ObjectId(id) }, {$set: options });
            return await this.getSnippet({type});
        } else {
            throw new Error('Не корректный id.');
        }
    }

    async uploadSnippetImage(req) {
        let path = GALLERY_UPLOADS_PATH;
        let image = await imageSaver(req, path, 80);
        let thumbnailSize: IThumbnailSize = {
            height: '370',
            width: '670'
        };
        let thumbnail = await thumbnailSaver(req, path, thumbnailSize);
        return ({
            thumbnail,
            image
        });
    }
}
