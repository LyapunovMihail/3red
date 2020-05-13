import { ABOUT_CAREER_COLLECTION_NAME, ErrorNotCorrectArguments, ICareerSnippet } from './about-career.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class AboutCareerModel {

    collectionName = ABOUT_CAREER_COLLECTION_NAME;

    collection: any;

    constructor(public db: any) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet() {
        return await this.collection.findOne({});
    }

    async updateSnippet(parameters) {
        const options: ICareerSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({}, { $set : options }, {upsert: true});
        });
    }

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
        return ('created_at' in options && 'last_modifyed' && 'data' in options) || 'switchOn' in options;
    }
}
