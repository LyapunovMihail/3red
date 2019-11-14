import { fileExtension, imageSaver, thumbnailSaver } from './../utilits/image-saver.utilits';
import { SHARES_COLLECTION_NAME, Share, SHARES_UPLOADS_PATH } from './shares.iterfaces';
import * as mongodb from 'mongodb';
const ObjectId = require('mongodb').ObjectID;

export class SharesModel {

    private collectionName = SHARES_COLLECTION_NAME;

    private collection: any;

    constructor ( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    public async createShare(obj) {
        return await this.collection.insert(obj);
    }

    public async getShares(limit: number, skip: number) {
        let options = {
            limit,
            skip
        };
        let length = await this.collection.count();
        let sharesList = await this.collection.find({}, options).sort({ created_at: -1 }).toArray();
        console.log('sharesList: ', sharesList);
        return ({
            length,
            sharesList
        });
    }

    public async getShareById(id) {
        if ( (ObjectId.isValid(id)) ) {
            return await this.collection.find({ _id: ObjectId(id) }).toArray();
        } else {
            return [];
        }
    }

    public async updateShare(_id, obj: Share) {
        return await this.collection.updateOne({ _id: ObjectId(_id) }, { $set: obj });
    }

    public async deleteShare(_id) {
        return await this.collection.deleteOne({ _id: ObjectId(_id) });
    }

    public async uploadImage(req) {
        if (
            fileExtension(req.files['file'].originalFilename) === '.jpg'
            || fileExtension(req.files['file'].originalFilename) === '.jpeg'
            || fileExtension(req.files['file'].originalFilename) === '.png'
        ) {
            let path = SHARES_UPLOADS_PATH;
            let image = await imageSaver(req, path, 50);
            let thumbnail = await thumbnailSaver(req, path, {width: '300', height: '200'});
            return ({
                image,
                thumbnail
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
    }
}
