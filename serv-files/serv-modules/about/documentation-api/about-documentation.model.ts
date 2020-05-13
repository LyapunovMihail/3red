import { fileSaver } from '../../utilits/file-saver.utilits';
import {
    FILEUPLOADS_UPLOADS_PATH, IDocUploadItem, ABOUT_DOCUMENTATION_COLLECTION_NAME, IDocSnippet,
} from './about-documentation.interfaces';
import {ErrorNotCorrectArguments} from './about-documentation.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class AboutDocumentationModel {

    private collectionName = ABOUT_DOCUMENTATION_COLLECTION_NAME;

    private collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet() {
        return await this.collection.findOne();
    }

    async updateSnippet(parameters) {
        const options: IDocSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options),  async () => {
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
        return ('created_at' in options && 'last_modifyed' && 'block' in options) || 'switchOn' in options;
    }
}
