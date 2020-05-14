import { ErrorNotCorrectArguments, SERVICE_TABS_COLLECTION_NAME, IServiceTabsSnippet } from './service-tabs.interfaces';
import { SERVICE_COLLECTION_NAME } from '../service-api/service.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ServiceTabsModel {

    collectionName = SERVICE_TABS_COLLECTION_NAME;
    collection: any;
    serviceCollectionName = SERVICE_COLLECTION_NAME;
    serviceCollection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
        this.serviceCollection = db.collection(this.serviceCollectionName);
    }

    async getTeamTabs() {
        return await this.collection.findOne({});
    }

    async updateTeamTabs(parameters) {
        const options: IServiceTabsSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), async () => {
            // удаление _id из параметров если он там есть
            if ('_id' in options) {
                delete options._id;
            }
            this.deleteUk(options);
            await this.collection.update({}, { $set : options }, {upsert: true});
        });
    }

    private async deleteUk(options) {
        const tabs = options.tabs.map((item) => item.name);
        await this.serviceCollection.remove({$pull : {uk: {tab : {$nin: tabs} }}});
    }

    async deleteSnippet() {
        return await this.collection.deleteOne({});
    }

    // обертка для возврата ошибки о неверно переданных параметрах
    async errorParamsCatcher(val, fn) {
        if ( val ) {
            await fn();
            return await this.getTeamTabs();
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        return 'tab' in options;
    }

}
