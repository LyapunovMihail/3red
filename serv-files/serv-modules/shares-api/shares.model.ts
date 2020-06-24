import { fileExtension, imageSaver, thumbnailSaver } from './../utilits/image-saver.utilits';
import { SHARES_COLLECTION_NAME, Share, SHARES_UPLOADS_PATH } from './shares.iterfaces';
import { INewsSnippet } from '../news-api/news.interfaces';
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

    public async getShares() {
        return await this.collection.find({}).sort({ created_at: -1 }).toArray();
    }

    // public async getShares(limit: number, skip: number) {
    //     let options = {
    //         limit,
    //         skip
    //     };
    //     let length = await this.collection.count();
    //     let sharesList = await this.collection.find({}, options).sort({ created_at: -1 }).toArray();
    //     return ({
    //         length,
    //         sharesList
    //     });
    // }

    public async getShareById(id) {
        if ( (ObjectId.isValid(id)) ) {
            return await this.collection.find({ _id: ObjectId(id) }).sort({ created_at: -1 }).toArray();
        } else {
            return [];
        }
    }

    public async getMainSnippet() {
        return await this.collection.find({ show_on_main: true }).sort({ created_at: -1 }).toArray();
    }

    public async getObjectSnippet(objectId) {
        return await this.collection.find({ objectId }).toArray();
    }

    public async updateShare(_id, obj: Share) {
        if ( '_id' in obj ) { delete obj._id; }
        await this.collection.updateOne({ _id: ObjectId(_id) }, { $set: obj });
        return this.getShareById(_id);
    }

    async updateShareCount(id, parameters, item, session) {
        const options: INewsSnippet = parameters;
        session.shareCount = session.shareCount ? session.shareCount : {vk: false, fb: false, ok: false}; // добавляем в сессию счетчики кликов соцсестей
        if (item === 'vk') {
            if (!session.shareCount.vk) {
                session.shareCount.vk = true;
                options.shareCount.vk++;
            }
        } else if (item === 'fb') {
            if (!session.shareCount.fb) {
                session.shareCount.fb = true;
                options.shareCount.fb++;
            }
        } else if (item === 'ok') {
            if (!session.shareCount.ok) {
                session.shareCount.ok = true;
                options.shareCount.ok++;
            }
        }
        return await this.updateShare(id, parameters);
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
            let thumbnail = await thumbnailSaver(req, path, {width: '352', height: '264'});
            return ({
                image,
                thumbnail
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
    }
}
