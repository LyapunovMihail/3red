import { ADDRESSES_COLLECTION_NAME, IAddressItemFlat } from './addresses.interfaces';
import * as mongodb from 'mongodb';
import { FormConfig } from './search-form.config';
const ObjectId = require('mongodb').ObjectID;

export class AddressesModel {

    private collectionName = ADDRESSES_COLLECTION_NAME;

    private collection: any;

    private objectId = mongodb.ObjectId;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    public async getObjects(query) {
        let data = this.parseRequest(query);
        return await this.collection.find(data.request, data.parameters).toArray();
    }

    public async getObjectsWithCount(query) {
        let data = this.parseRequest(query);
        return {
            count: await this.collection.find(data.request, data.parameters).count(),
            flats: await this.collection.find(data.request, data.parameters).toArray()
        };
    }

    public async getSearchConfig() {
        let config = await this.db.collection('flats-search-config').find({}).toArray();
        return config;
    }

    public parseRequest(query) {
        let request: any = {};

        if ('sections' in query && (/[1|2|3|4|5|6]/).exec(query.sections)) {
            request.section = { $in: query.sections.split(',').map(Number) };
        }
        if ('houses' in query && (/[1|2|3|9]/).exec(query.houses)) {
            request.house = { $in: query.houses.split(',').map(Number) };
        }
        if ('rooms' in query && (/[0|1|2|3|4]/).exec(query.rooms)) {
            request.rooms = { $in: query.rooms.split(',').map(Number) };
        }
        if ( 'priceMin' in query && 'priceMax' in query ) {
            request.price = { $gte: Number(query.priceMin), $lte: Number(query.priceMax) };
        }
        if ( 'floorMin' in query && 'floorMax' in query ) {
            request.floor = { $gte: Number(query.floorMin), $lte: Number(query.floorMax) };
        }
        if ( 'spaceMin' in query && 'spaceMax' in query ) {
            request.space = { $gte: Number(query.spaceMin), $lte: Number(query.spaceMax) };
        }
        if ( 'floor' in query ) {
            request.floor = Number(query.floor);
        }
        if ( 'number' in query ) {
            request.flat = Number(query.number);
        }
        if ('type' in query && query.type.split(',').every((item) => FormConfig.typeList.some((i) => item === i.value))) {
            request.type = { $in: query.type.split(',')};
        }
        if ('decoration' in query && query.decoration.split(',').every((item) => FormConfig.decorationList.some((i) => item === i.value))) {
            request.decoration = { $in: query.decoration.split(',')};
        }

        let parameters = {};

        if ('skip' in query && 'limit' in query) {
            parameters = {
                skip : Number(query['skip']),
                limit : Number(query['limit'])
            };
        }

        if ('sort' in query && query.sort === 'price_1') {
            parameters['sort'] = { price : 1 };
        } else if ('sort' in query && query.sort === 'price_0') {
            parameters['sort'] = { price : -1 };
        } else if ('sort' in query && query.sort === 'space_1') {
            parameters['sort'] = { space : 1 };
        } else if ('sort' in query && query.sort === 'space_0') {
            parameters['sort'] = { space : -1 };
        } else if ('sort' in query && query.sort === 'floor_1') {
            parameters['sort'] = { floor : 1 };
        } else if ('sort' in query && query.sort === 'floor_0') {
            parameters['sort'] = { floor : -1 };
        } else if ('sort' in query && query.sort === 'delivery_1') {
            parameters['sort'] = { deliveryDate : 1 };
        } else if ('sort' in query && query.sort === 'delivery_0') {
            parameters['sort'] = { deliveryDate : -1 };
        }

        if ('flats' in query) {
            const arr = query.flats.split('s');
            const sectionsArray = [];
            for (let i = 1; i < arr.length; i++) {
              let sectionObj = {};
              if (arr[i].indexOf('-') >= 0) {
                sectionObj = {
                  section: arr[i].substring(0, arr[i].indexOf('-')),
                  flat: {$in: arr[i].substring(arr[i].indexOf('-') + 1).split(',')}
                };
              } else {
                sectionObj['section'] = arr[i].substring(0);
              }
              sectionsArray.push(sectionObj);
            }
            request = {
              $or: sectionsArray
            };
        }

        return {
            request,
            parameters
        };
    }
}
