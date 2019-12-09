import { ErrorNotCorrectArguments, OBJECTS_TABS_COLLECTION_NAME, IObjectTabsSnippet } from './objects-tabs.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsTabsModel {

    collectionName = OBJECTS_TABS_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getGalleryTabs(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria, {decoration: 0});
    }

    async updateGalleryTabs(parameters) {
        const options: IObjectTabsSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            const created = await this.collection.update({ objectId : options.objectId }, { $set : {gallery: options.gallery} }, {upsert: true});
        });
    }

    async getDecorationTabs(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria, {gallery: 0});
    }

    async updateDecorationTabs(parameters) {
        const options: IObjectTabsSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            const created = await this.collection.update({ objectId : options.objectId }, { $set : {decoration: options.decoration} }, {upsert: true});
        });
    }

    async deleteSnippet(objectId) {
        return await this.collection.deleteOne({objectId});
    }

    // обертка для возврата ошибки о неверно переданных параметрах
    async errorParamsCatcher(val, objectId, fn) {
        if ( val ) {
            await fn();
            // return await this.getSnippet(objectId);
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        console.log('options: ', options);
        return ( 'gallery' in options || 'decoration' in options  ? true : false );
    }

}
