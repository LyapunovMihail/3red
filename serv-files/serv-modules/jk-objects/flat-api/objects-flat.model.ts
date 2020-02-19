import { IObjectFlatSnippet, ErrorNotCorrectArguments, OBJECTS_FLAT_COLLECTION_NAME } from './objects-flat.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsFlatModel {

    collectionName = OBJECTS_FLAT_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria);
    }

    async updateSnippet(parameters) {
        const options: IObjectFlatSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            const created = await this.collection.update({ objectId : options.objectId }, { $set : options }, {upsert: true});
        });
    }

    async deleteSnippet(objectId) {
        return await this.collection.deleteOne({objectId});
    }

    // обертка для возврата ошибки о неверно переданных параметрах
    async errorParamsCatcher(val, objectId, fn) {
        if ( val ) {
            await fn();
            return await this.getSnippet(objectId);
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        console.log('options: ', options);
        return ( 'objectId' in options && 'switchOn' in options  ? true : false );
    }

}
