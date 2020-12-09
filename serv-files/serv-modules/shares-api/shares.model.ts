import { fileExtension, imageSaver, thumbnailSaver } from './../utilits/image-saver.utilits';
import { Share, SHARES_COLLECTION_NAME, SHARES_UPLOADS_PATH } from './shares.iterfaces';
import { INewsSnippet } from '../news-api/news.interfaces';
import * as moment from 'moment';

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

    public async getShares(withoutExpired = false) {
        return await this.collection.find({}).sort({ created_at: -1 }).toArray();
    }

    public async getShareById(id) {
        if ( (ObjectId.isValid(id)) ) {
            return await this.collection.find({ _id: ObjectId(id) }).sort({ created_at: -1 }).toArray();
        } else {
            return [];
        }
    }

    public async getMainSnippet() {
        const snippets =  await this.collection.find({ show_on_main: true }).sort({ created_at: -1 }).toArray();
        const filteredSnippets = SharesModel.filterExpiredShares(snippets);
        return filteredSnippets;
    }

    public async getObjectSnippet(objectId) {
        return await this.collection.find({ objectId }).toArray();
    }

    public async updateShare(_id, obj: Share) {
        if ( '_id' in obj ) { delete obj._id; }
        return this.collection.updateOne({ _id: ObjectId(_id) }, { $set: obj });
    }

    private static filterExpiredShares(snippets) {
        const filteredSnippets = snippets.filter((share: Share) => !share.countdown || (share.countdown && SharesModel.countDaysLeft(share.finish_date) >= 0));
        return filteredSnippets;
    }

    private static countDaysLeft(finishDate) {
        const createdDateVal = moment(Date.now());
        const finishDateVal = moment(finishDate);
        const duration = moment.duration(createdDateVal.diff(finishDateVal));
        return Math.ceil(duration.asDays() * -1);
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
        const ext = fileExtension(req.files.file.originalFilename);

        if (ext === '.jpg' || ext === '.jpeg') {
            let path = SHARES_UPLOADS_PATH;
            let image = await imageSaver(req, path, 50);
            let thumbnail = await thumbnailSaver(req, path, {width: '400', height: '267'});
            return ({
                image,
                thumbnail
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
    }
}
