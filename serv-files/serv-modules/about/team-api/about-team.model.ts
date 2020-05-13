import { ABOUT_TEAM_COLLECTION_NAME, ABOUT_TEAM_UPLOADS_PATH, ErrorNotCorrectArguments, ITeamSnippet } from './about-team.interfaces';
import { fileExtension, imageSaver, thumbnailSaver } from '../../utilits/image-saver.utilits';
const ObjectId = require('mongodb').ObjectID;

export class AboutTeamModel {

    collectionName = ABOUT_TEAM_COLLECTION_NAME;

    collection: any;

    constructor(public db: any) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippets() {
        return await this.collection.find({}).toArray();
    }

    async updateSnippet(parameters) {
        const options: ITeamSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({tab: options.tab}, { $set : options }, {upsert: true});
        });
    }

    async errorParamsCatcher(val, fn) {
        if ( val ) {
            await fn();
            return await this.getSnippets();
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.jpg' ) {
            const path = ABOUT_TEAM_UPLOADS_PATH;
            const image = await imageSaver(req, path, 50);
            const thumbnail = await thumbnailSaver(req, path, {width: '258', height: '258'});
            return ({
                image,
                thumbnail,
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        return 'created_at' in options && 'last_modifyed' && 'data' in options;
    }
}
