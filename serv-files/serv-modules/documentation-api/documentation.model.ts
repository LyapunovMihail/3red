import { fileSaver } from './../utilits/file-saver.utilits';
import { FILEUPLOADS_UPLOADS_PATH, IFileUploadsSnippet } from './../fileuploads-api/fileuploads.interfaces';
import { DOCUMENTATION_COLLECTION_NAME, IDocumentationItem, IDocumentationUploadItem, IDocumentationDescription } from './documentation.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class DocumentationModel {

    private collectionName = DOCUMENTATION_COLLECTION_NAME;

    private collection: any;

    private mainObjectId = 'header';

    constructor ( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    public async createObject() {
        const objItem: IDocumentationItem = {
            title: '',
            uploads: []
        };
        await this.collection.insert(objItem);
        return await this.getObjects();
    }

    async getHeaderDescription() {
        let headerDescription = await this.collection.findOne({_id: this.mainObjectId});
        return (headerDescription ? headerDescription : {
            description: ''
        });
    }

    async updateHeaderDescription(description) {
        let headerDescription = await this.collection.findOne({_id: this.mainObjectId});
        let options: IDocumentationDescription = {
            _id: this.mainObjectId,
            description
        };
        if (headerDescription) {
            await this.collection.updateOne({_id: this.mainObjectId}, {$set: {description}});
        } else {
            await this.collection.insert(options);
        }
        return options;
    }

    async getObjects() {
        return await this.collection.find(
            {_id: {$ne: this.mainObjectId}}
        ).toArray();
    }

    async deleteObject(_id) {
        await this.collection.deleteOne({ _id: ObjectId(_id) });
        return await this.getObjects();
    }

    async updateObjectTitle(_id, title) {
        const options = {title};
        await this.collection.updateOne({_id: ObjectId(_id)}, {$set: options});
        return await this.getObjects();
    }

    async uploadFile(req: any) {
        let _id = req.headers.id;
        let path = FILEUPLOADS_UPLOADS_PATH;
        let fileName: any = await fileSaver(req, path);
        const date = new Date();
        let snippet: IDocumentationUploadItem = {
            name: fileName,
            originalName: req.files['file'].originalFilename,
            created_at: date
        };
        await this.collection.updateOne({_id: ObjectId(_id)}, {$push: {uploads: snippet}});
        return await this.getObjects();
    }

    async deleteFile(_id, file) {
        if (_id && file) {
            await this.collection.updateOne({_id: ObjectId(_id)}, {$pull: {uploads: file}});
        }
        return await this.getObjects();
    }
}
