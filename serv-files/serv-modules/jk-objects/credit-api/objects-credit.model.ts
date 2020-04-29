import { imageSaver, thumbnailSaver, fileExtension } from '../../utilits/image-saver.utilits';
import { IObjectCreditSnippet, OBJECTS_CREDIT_COLLECTION_NAME, OBJECTS_CREDIT_UPLOADS_PATH } from './objects-credit.interfaces';
import { ErrorNotCorrectArguments } from '../documentation-api/objects-documentation.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsCreditModel {

    collectionName = OBJECTS_CREDIT_COLLECTION_NAME;

    collection: any;

    constructor(public db: any) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria);
    }

    async updateSnippet(parameters) {
        const options: IObjectCreditSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({}, { $set : options }, {upsert: true});
        });
    }

    async errorParamsCatcher(val, objectId, fn) {
        if ( val ) {
            await fn();
            return await this.getSnippet();
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.jpg' ||
            fileExtension(req.files.file.originalFilename) === '.svg' ||
            fileExtension(req.files.file.originalFilename) === '.png' ) {
            const path = OBJECTS_CREDIT_UPLOADS_PATH;
            const image = await imageSaver(req, path, 50);
            return ({
                image,
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        return ('objectId' in options && 'created_at' in options && 'last_modifyed' && 'name' in options
            && 'percent' in options && 'initial' in options && 'deadline' in options && 'show' in options) || 'objectId' in options && 'switchOn' in options;
    }
}
