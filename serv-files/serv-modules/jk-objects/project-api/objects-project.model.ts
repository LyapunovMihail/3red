import { IObjectProjectSnippet, ErrorNotCorrectArguments, OBJECTS_PROJECT_COLLECTION_NAME } from './objects-project.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsProjectModel {

    collectionName = OBJECTS_PROJECT_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(objectId?) {
        const findCriteria = objectId ? {objectId} : {};
        return await this.collection.findOne(findCriteria);
    }

    async updateSnippet(parameters) {
        const options: IObjectProjectSnippet = parameters;
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
        return ( ( 'objectId' in options && 'created_at' in options && 'last_modifyed' in options && 'socials' in options
            && 'description' in options && 'indicators' in options ) || 'objectId' in options && 'switchOn' in options ? true : false );
    }

}
