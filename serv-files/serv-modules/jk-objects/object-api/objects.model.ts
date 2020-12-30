import { IObjectSnippet, OBJECTS_OBJECT_COLLECTION_NAME, OBJECTS_UPLOADS_PATH } from './objects.interfaces';
import { ErrorNotCorrectArguments } from '../documentation-api/objects-documentation.interfaces';
import { fileExtension, imageSaver, thumbnailSaver } from '../../utilits/image-saver.utilits';
import { ADDRESSES_COLLECTION_NAME } from '../../addresses-api/addresses.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsModel {

    private collectionName = OBJECTS_OBJECT_COLLECTION_NAME;
    private collection: any;
    private addressesCollectionName = ADDRESSES_COLLECTION_NAME;
    private addressesCollection: any;

    constructor(public db: any) {
        this.collection = db.collection(this.collectionName);
        this.addressesCollection = db.collection(this.addressesCollectionName);
    }

    async getSnippet(objectId?) {
        const findCriteria = objectId && objectId !== 'undefined' ? { _id : ObjectId(objectId)} : {};
        console.log('objectId: ', objectId);
        console.log('findCriteria: ', findCriteria);
        return await this.collection.find(findCriteria).toArray();
    }

    async getSnippetByParams(query) {
        const request: any = {};
        if ('districts' in query) {
            request.district = { $in: query.districts.split(',') };
        }
        if ( 'status' in query ) {
            request.status = query.status;
        }

        const flatsRequest: any = {};
        flatsRequest.type = {$in: ['КВ', 'АП']};
        if ( 'priceMin' in query && 'priceMax' in query) {
            flatsRequest.price = { $gte: Number(query.priceMin), $lte: Number(query.priceMax) };
        }
        if ( ('priceMin' in query) && !('priceMax' in query)) {
            flatsRequest.price = { $gte: Number(query.priceMin) };
        }
        if ( 'priceMax' in query && !('priceMin' in query) ) {
            flatsRequest.price = { $lte: Number(query.priceMax) };
        }

        const jkSnippets = await this.collection.find(request).toArray();

        if (!flatsRequest.price) {
            return jkSnippets;
        } else {
            const flatsSnippets = await this.addressesCollection.find(flatsRequest).toArray();
            return jkSnippets.filter((jk) => flatsSnippets.some((flat) => flat.mod === jk.mod));
        }
    }

    async setSnippet(parameters) {
        const options: IObjectSnippet = parameters;
        return await this.errorParamsCatcher( this.valuesReview(options), async () => {
            const created = await this.collection.insert(options);
        });
    }

    async updateSnippet(id, parameters) {
        const options: IObjectSnippet = parameters;
        return await this.errorParamsCatcher( ( this.valuesReview(options) && ObjectId.isValid(id) ), async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            const created = await this.collection.updateOne({ _id : ObjectId(id) }, { $set : options });
        });
    }

    async deleteSnippet(id) {
        return await this.errorParamsCatcher(ObjectId.isValid(id), async () => {
            await this.collection.deleteOne({ _id : ObjectId(id) });
        });
    }

    async updateCollection(parameters) {
        const snippets: IObjectSnippet[] = parameters;
        for (const snippet of snippets) {
            snippet._id = ObjectId(snippet._id);
            if (!this.valuesReview(snippet)) {
                throw new Error(ErrorNotCorrectArguments);
            }
        }
        await this.collection.remove({});
        await this.collection.insert(snippets);
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.jpg' ) {
            const path = OBJECTS_UPLOADS_PATH;
            const image = await imageSaver(req, path, 50);
            const thumbnail = await thumbnailSaver(req, path, {width: '324', height: '188'});
            return ({
                image,
                thumbnail,
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
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
        return ('mod' in options && 'created_at' in options && 'last_modifyed' && 'name' in options && 'address' in options && 'coords' in options && 'show_on_main' in options
            && 'publish' in options && 'status' in options);
    }
}
