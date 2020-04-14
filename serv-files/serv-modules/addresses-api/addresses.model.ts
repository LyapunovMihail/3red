import { ADDRESSES_COLLECTION_NAME } from './addresses.interfaces';
import * as mongodb from 'mongodb';
import { FormConfig } from './search-form.config';
import { IObjectSnippet, OBJECTS_OBJECT_COLLECTION_NAME } from '../jk-objects/object-api/objects.interfaces';
import { OBJECTS_FLAT_COLLECTION_NAME } from '../jk-objects/flat-api/objects-flat.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class AddressesModel {

    private collectionName = ADDRESSES_COLLECTION_NAME;
    private collection: any;
    private objectCollectionName = OBJECTS_OBJECT_COLLECTION_NAME;
    private objectCollection: any;
    private flatCollectionName = OBJECTS_FLAT_COLLECTION_NAME;
    private flatCollection: any;

    private objectId = mongodb.ObjectId;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
        this.objectCollection = db.collection(this.objectCollectionName);
        this.flatCollection = db.collection(this.flatCollectionName);
    }

    public async getFlats(query) {
        let data = this.parseRequest(query);
        return await this.collection.find(data.request, data.parameters).toArray();
    }

    public async getObjectFlats(query) {
        let data = this.parseRequest(query);


        return await this.collection.find(data.request, data.parameters).toArray();
    }

    public async getCommonFlats(query) {
        let data = this.parseRequest(query);

        const findByMod = query.mod ? {mod : query.mod} : {};
        const flatsOfMod = await this.collection.find(findByMod).toArray();
        const modsBtnList = await this.setModBtns();
        const housesBtnList = await this.setHousesBtns(query.mod, flatsOfMod, modsBtnList);
        const housesMods = query.housesMods ? query.housesMods.split('nzt;').map((item) => JSON.parse(item)) : [];

        const result = {modsBtnList, housesBtnList, flats: []};
        if (housesMods.length) {
            for (const item of housesMods) {
                const items = await this.collection.find({...data.request, mod: item.mod, house: item.value}, data.parameters).toArray();
                result.flats.push(...items);
            }
        } else {
            result.flats.push(...await this.collection.find(data.request, data.parameters).toArray());
        }

        result.flats.forEach((flat) => flat.jkName = modsBtnList.find((jk) => jk.value === flat.mod).name);

        return result;
    }
    private async setModBtns() {
        const objects = await this.objectCollection.find().toArray();
        const modsBtnList = [];
        modsBtnList.push({ name: 'Все комплексы', value: '' });
        for (const item of objects) {
            const flatSnippet = await this.flatCollection.findOne({ objectId: item.mod }); // Проверяем включен ли блок квартир в объекте, если включен, то добавляем таб этого объекта
            if (flatSnippet && flatSnippet.switchOn) {
                if (!modsBtnList.includes({ name: item.name, value: item.mod })) {
                    modsBtnList.push({ name: item.name, value: item.mod });
                }
            }
        }
        return modsBtnList;
    }
    private async setHousesBtns(mod, flatsOfMod, modsBtnList) {
        const housesBtnList = [];
        housesBtnList.push({ name: 'Все дома', value: 'all' });
        if (mod) {
            const jk = modsBtnList.find((item) => item.value === mod);
            housesBtnList.push({jk : jk.name});

            const flats = flatsOfMod.filter((flat) => flat.mod === jk.value);
            flats.sort((flat1, flat2) => flat1.house > flat2.house ? 1 : -1); // сортировка по возрастанию номера дома

            flats.forEach((item) => {
                if (!housesBtnList.some((btn) => btn.value === item.house)) {
                    housesBtnList.push({ name: 'Дом № ' + item.house, value: item.house, mod: jk.value });
                }
            });
        } else {
            modsBtnList.forEach((jk, i) => {
                if (i > 0) {
                    const flats = flatsOfMod.filter((flat) => flat.mod === jk.value);
                    flats.sort((flat1, flat2) => flat1.house > flat2.house ? 1 : -1);   // сортировка по возрастанию номера дома
                    if (flats.length) {
                        housesBtnList.push({ jk: jk.name });    // При появлении нового жк, добавлять его название в массив

                        flats.forEach((item) => {
                            if (!housesBtnList.some((btn) => btn.value === item.house)) {
                                housesBtnList.push({ name: 'Дом № ' + item.house, value: item.house, mod: item.mod});
                            }
                        });
                    }
                }
            });
        }
        return housesBtnList;
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

        if ('sections' in query) {
            request.section = { $in: query.sections.split(',').map(Number) };
        }
        if ('houses' in query) {
            request.house = { $in: query.houses.split(',') };
        }
        if ('mod' in query) {
            request.mod = { $in: query.mod.split(',') };
        }
        if ('rooms' in query && (/[0|1|2|3]/).exec(query.rooms)) {
            if ((/[3]/).exec(query.rooms)) {
                query.rooms = query.rooms + ',4,5,6'; // если выбраны 3+, то добавляем квартиры большей комнатности
            }
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
