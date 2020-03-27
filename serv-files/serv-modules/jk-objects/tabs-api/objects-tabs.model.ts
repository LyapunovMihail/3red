import { ErrorNotCorrectArguments, OBJECTS_TABS_COLLECTION_NAME, IObjectTabsSnippet } from './objects-tabs.interfaces';
import { OBJECTS_LOCATION_COLLECTION_NAME } from '../location-api/objects-location.interfaces';
import { OBJECTS_MEMBERS_COLLECTION_NAME } from '../members-api/objects-members.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsTabsModel {

    collectionName = OBJECTS_TABS_COLLECTION_NAME;
    collection: any;
    locationCollectionName = OBJECTS_LOCATION_COLLECTION_NAME;
    locationCollection: any;
    membersCollectionName = OBJECTS_MEMBERS_COLLECTION_NAME;
    membersCollection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
        this.locationCollection = db.collection(this.locationCollectionName);
        this.membersCollection = db.collection(this.membersCollectionName);
    }

    async getGalleryTabs(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria, {decorationType: 0, location: 0});
    }

    async updateGalleryTabs(parameters) {
        const options: IObjectTabsSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, 'gallery', async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({ objectId : options.objectId }, { $set : {gallery: options.gallery, created_at: options.created_at, last_modifyed: options.last_modifyed, objectId : options.objectId} }, {upsert: true});
        });
    }

    async getDecorationTabs(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria, {gallery: 0, location: 0});
    }

    async updateDecorationTabs(parameters) {
        const options: IObjectTabsSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, 'decoration', async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({ objectId : options.objectId }, { $set : {decorationType: options.decorationType, created_at: options.created_at, last_modifyed: options.last_modifyed, objectId : options.objectId} }, {upsert: true});
        });
    }

    async getLocationTabs(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria, {gallery: 0, decorationType: 0});
    }

    async updateLocationTabs(parameters) {
        const options: IObjectTabsSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, 'location', async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({ objectId : options.objectId }, { $set : {location: options.location, created_at: options.created_at, last_modifyed: options.last_modifyed, objectId : options.objectId} }, {upsert: true});
            const contentSnippet = await this.locationCollection.findOne({ objectId : options.objectId });
            if (contentSnippet.data) {
                contentSnippet.data.forEach((item, i) => { item.tab = options.location[i]; });
                if ( '_id' in contentSnippet) { delete contentSnippet._id; }
                await this.locationCollection.update({ objectId : contentSnippet.objectId }, { $set : contentSnippet }, {upsert: true});
            }
        });
    }

    async deleteSnippet(objectId) {
        return await this.collection.deleteOne({objectId});
    }

    // обертка для возврата ошибки о неверно переданных параметрах
    async errorParamsCatcher(val, objectId, type, fn) {
        if ( val ) {
            await fn();
            if (type === 'gallery') {
                return this.getGalleryTabs(objectId);
            } else if (type === 'decoration') {
                return await this.getDecorationTabs(objectId);
            } else if (type === 'location') {
                return await this.getLocationTabs(objectId);
            }
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        return 'objectId' in options && ('gallery' in options || 'decorationType' in options || 'location' in options);
    }

}
