import { fileSaver } from '../../utilits/file-saver.utilits';
import {
    DOCUMENTATION_COLLECTION_NAME, FILEUPLOADS_UPLOADS_PATH,
    IObjectDocSnippet, IDocUploadItem,
} from './objects-documentation.interfaces';
import {ErrorNotCorrectArguments} from './objects-documentation.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsDocumentationModel {

    private collectionName = DOCUMENTATION_COLLECTION_NAME;

    private collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria);
    }

    async updateSnippet(parameters) {
        const options: IObjectDocSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({}, { $set : options }, {upsert: true});
        });
    }

    async deleteSnippet(objectId) {
        return await this.collection.deleteOne({objectId});
    }

    async uploadFile(req: any) {
        const path = FILEUPLOADS_UPLOADS_PATH;
        const fileName: any = await fileSaver(req, path);
        const snippet: IDocUploadItem = {
            name: fileName,
            originalName: req.files.file.originalFilename,
            date: new Date().toLocaleDateString(),
        };
        // await this.collection.updateOne({_id: ObjectId(_id)}, {$push: {uploads: snippet}});
        return snippet;
    }

    // обертка для возврата ошибки о неверно переданных параметрах
    async errorParamsCatcher(val, objectId, fn) {
        if ( val ) {
            await fn();
            return await this.getSnippet();
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        return ('objectId' in options && 'created_at' in options && 'last_modifyed' && 'block' in options) || 'objectId' in options && 'switchOn' in options;
    }
}
