import { IObjectSnippet, OBJECTS_OBJECT_COLLECTION_NAME, OBJECTS_UPLOADS_PATH } from './objects.interfaces';
import { ErrorNotCorrectArguments } from '../documentation-api/objects-documentation.interfaces';
import { fileExtension, imageSaver, thumbnailSaver } from '../../utilits/image-saver.utilits';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsModel {

    collectionName = OBJECTS_OBJECT_COLLECTION_NAME;

    collection: any;

    constructor(public db: any) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(objectId?) {
        const findCriteria = objectId && objectId !== 'undefined' ? {objectId} : {};
        return await this.collection.find(findCriteria).toArray();
    }

    async getSnippetByParams(query) {
        const request: any = {};

        if ('districts' in query) {
            request.district = { $in: query.districts.split(',') };
        }
        if ( 'status' in query ) {
            request.status = query.status;
        }

        /*
         Для бэкэнда
         snippets.filter((jk) => {
            return flats.some((flat) => flat.mod === jk.objectId && flat.price >= params.priceMin && flat.price <= params.priceMax);
         });
        */
        return await this.collection.find(request).toArray();
    }

    // async updateSnippet(parameters) {
    //     const options: IObjectSnippet = parameters;
    //     return await this.errorParamsCatcher(this.valuesReview(options), async () => {
    //         // удаление _id из параметров если он там есть
    //         if ( '_id' in options ) { delete options._id; }
    //         await this.collection.update({}, { $set : options }, {upsert: true});
    //     });
    // }

    // создание новости
    async setSnippet(parameters) {
        const options: IObjectSnippet = parameters;
        return await this.errorParamsCatcher( this.valuesReview(options), async () => {
            const created = await this.collection.insert(options);
        });
    }

    // обновление новости
    async updateSnippet(id, parameters) {
        const options: IObjectSnippet = parameters;
        return await this.errorParamsCatcher( ( this.valuesReview(options) && ObjectId.isValid(id) ),async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            const created = await this.collection.updateOne({ _id : ObjectId(id) }, { $set : options });
        });
    }

    async deleteSnippet(id) {
        return await this.errorParamsCatcher(ObjectId.isValid(id), async () => {
            await this.collection.deleteOne({ _id : ObjectId(id) });
        });
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.jpg' ) {
            const path = OBJECTS_UPLOADS_PATH;
            const image = await imageSaver(req, path, 50);
            const thumbnail = await thumbnailSaver(req, path, {width: '324', height: '188'});
            return ({
                image,
                thumbnail,
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
    }

    async errorParamsCatcher(val, fn) {
        if ( val ) {
            await fn();
            return await this.getSnippet();
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        return ('mod' in options && 'created_at' in options && 'last_modifyed' && 'name' in options && 'address' in options && 'coords' in options && 'show_on_main' in options
            && 'publish' in options && 'status' in options);
    }
}
