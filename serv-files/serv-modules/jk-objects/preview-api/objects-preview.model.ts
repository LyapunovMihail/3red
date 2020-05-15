import { imageSaver, thumbnailSaver, fileExtension } from '../../utilits/image-saver.utilits';
import { IObjectPreviewSnippet, OBJECTS_PREVIEW_COLLECTION_NAME, OBJECTS_PREVIEW_UPLOADS_PATH, ErrorNotCorrectArguments } from './objects-preview.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsPreviewModel {

    collectionName = OBJECTS_PREVIEW_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    // поиск превью
    async getSnippet(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria);
    }

    // обновление или создание превью
    async updateSnippet(parameters) {
        const options: IObjectPreviewSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            const created = await this.collection.update({ objectId : options.objectId }, { $set : options }, {upsert: true});
        });
    }

    // удаление превью
    async deleteSnippet(objectId) {
        return await this.collection.deleteOne({objectId});
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.jpg' ) {
            const path = OBJECTS_PREVIEW_UPLOADS_PATH;
            const image = await imageSaver(req, path, 50);
            const thumbnail = await thumbnailSaver(req, path, {width: '300', height: '200'});
            return ({
                image,
                thumbnail,
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
    }

    // обертка для возврата ошибки о неверно переданных параметрах
    async errorParamsCatcher(val, objectId, fn) {
        if ( val ) {
            await fn();
            return await this.getSnippet(objectId);
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        return ( ( 'objectId' in options && 'created_at' in options && 'last_modifyed' in options && 'mainInfo' in options
            && 'deadlines' in options && 'indicators' in options )  ? true : false );
    }

}
