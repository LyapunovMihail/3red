import { fileSaver } from './../utilits/file-saver.utilits';
import { FILEUPLOADS_COLLECTION_NAME, FILEUPLOADS_UPLOADS_PATH, IFileUploadsSnippet } from './fileuploads.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class FileUploadsModel {

    collectionName = FILEUPLOADS_COLLECTION_NAME;

    collection: any;

    constructor (public db: any) {
        this.collection = db.collection(this.collectionName);
    }

    async deleteSnippet(id, type) {
        await this.collection.deleteOne({ _id : ObjectId(id) });
        return await this.getSnippet(type);
    }

    async getSnippet(type) {
        return await this.collection.find({type}).toArray();
    }

    async uploadFile(req: any) {
        let date = new Date();
        let path = FILEUPLOADS_UPLOADS_PATH;
        let fileName: any = await fileSaver(req, path);
        let snippet: IFileUploadsSnippet = {
            created_at: date,
            name: fileName,
            originName: req.files['file'].originalFilename,
            type: req.headers.type
        };
        await this.collection.insertOne(snippet);
        return await this.getSnippet(req.headers.type);
    }
}
