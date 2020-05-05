import { ErrorNotCorrectArguments, IHomePreviewSnippet, HOME_PREVIEW_COLLECTION_NAME } from './home-preview.interfaces';

export class HomePreviewModel {

    collectionName = HOME_PREVIEW_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet() {
        return await this.collection.findOne();
    }

    async updateSnippet(parameters) {
        const options: IHomePreviewSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            const created = await this.collection.update({}, { $set : options }, {upsert: true});
        });
    }

    async deleteSnippet(objectId) {
        return await this.collection.deleteOne({objectId});
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
        return 'title' in options && 'text' in options && 'showNews' in options;
    }

}
