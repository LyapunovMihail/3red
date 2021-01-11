import { ADDRESSES_COLLECTION_NAME, IAddressItemFlat } from './addresses.interfaces';
import * as mongodb from 'mongodb';
import { FormConfig } from './search-form.config';
import { OBJECTS_OBJECT_COLLECTION_NAME } from '../jk-objects/object-api/objects.interfaces';
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

    constructor(public db: any) {
        this.collection = db.collection(this.collectionName);
        this.objectCollection = db.collection(this.objectCollectionName);
        this.flatCollection = db.collection(this.flatCollectionName);
    }

    // public async getObjectFlats(query) {
    //     let data = this.parseRequest(query);
    //     return await this.collection.find(data.request, data.parameters).toArray();
    // }

    public async getObjectsFlats(query) {
        if (query.mod && query.mod.split(',').length === 1) {
            const jk = await this.objectCollection.findOne({mod: query.mod});
            const flatSnippet = await this.flatCollection.findOne({objectId: jk._id.toString()});

            if (flatSnippet && flatSnippet.switchOn) {
                const data: any = this.parseRequest(query);
                return await this.collection.find(data.request, data.parameters).toArray();
            } else {
                return [];
            }

        } else {
            const data = this.parseRequest(query);
            return await this.collection.find(data.request, data.parameters).toArray();
        }
    }

    public async getObjectFlatsData(objectId) { // извлекаем объект жилищного комплекса, создаём список домов, схему домов-секций-этажей, стуктуру шахматки и мин-макс параметры для формы фильтрации
        const jk = await this.objectCollection.findOne({_id: ObjectId(objectId)});
        const data = this.parseRequest({mod: jk.mod, type: 'КВ,АП'});
        const flats = await this.collection.find(data.request, data.parameters).toArray();
        const {housesBtnList, floorCount, chess} = this.setDataStructures(flats);
        const config = this.setMinMaxParams(flats);
        return {jk, housesBtnList, floorCount, chess, config};
    }

    private setDataStructures(flats): { housesBtnList, floorCount, chess } { // устанавливаем схему домов-секций-этажей и список домов
        const housesBtnList = [];
        housesBtnList.push({name: 'Все корпуса', value: ''});
        const floorCount: any = {};
        const chess: any = {};

        flats.sort((flat1, flat2) => flat1.house > flat2.house ? 1 : -1); // сортировка по возрастанию номера дома чтобы в шахматке были по порядку

        flats.forEach((flat: IAddressItemFlat) => {
            this.setHousesBtnList(housesBtnList, flat);
            this.setFloorCount(floorCount, flat);
            this.setChess(chess, flat);
        });
        return {housesBtnList, floorCount, chess};
    }

    private setHousesBtnList(housesBtnList, flat) { // формируем список домов
        if (!housesBtnList.some((btn) => btn.value === flat.house)) {
            housesBtnList.push({name: 'Корпус № ' + flat.house, value: flat.house});
        }
    }

    private setFloorCount(floorCount, flat) {
        if (!floorCount[flat.house]) {
            floorCount[flat.house] = {};                    // добавляем дома к схеме
        }
        let section = floorCount[flat.house][flat.section];
        if (!section) {
            section = [];      // добавляем секции к домам
        }
        if (!section.some((floor) => floor === flat.floor)) {
            section.push(flat.floor);                           // добавляем этажи к секциям
            section.sort((floor1, floor2) => floor2 - floor1);  // сортируем этажи в порядке убывания
        }
        floorCount[flat.house][flat.section] = section;
    }

    private setChess(chess, flat) {
        if (!chess[flat.house]) {
            chess[flat.house] = [];
        }

        let section = chess[flat.house][flat.section];
        if (!section) {
            section = new Array(flat.floorsInSection).fill([]); // Заполняем секцию этажами и этажи мок квартирами
            section.forEach((floor, i) => {
                const mockFlat = {status: '-1', house: flat.house, section: flat.section, floor: section.length - i, flat: 99999};
                section[i] = new Array(flat.flatsInFloor).fill(mockFlat);
            });
            chess[flat.house][flat.section] = section;
        }

        const floor = section[section.length - flat.floor];
        const firstMockFlat = floor.findIndex((mockFlat) => mockFlat.status === '-1');  // Находим первую мок квартиру на этаже и меняем на настоящую
        floor[firstMockFlat] = flat;
        floor.sort((a, b) => a.flat - b.flat);
    }

    private setMinMaxParams(flats) {
        // const prices: number[];
        // const floors: number[];
        // const spaces: number[];
        // const statusFree: string[];
        // const statusСomingSoon: string[];
        // const decorationWithout: string[];
        // const decorationBlack: string[];
        // const decorationWhite: string[];
        // const separateentrance: boolean[];
        // const terrasescount: boolean[];
        // const roofexit: boolean[];
        // const twolevel: boolean[];
        // const IsEuro: boolean[];
        //
        // flats.forEach((flat) => {
        //     prices.push(flat.price);
        //     floors.push(flat.floor);
        //     spaces.push(flat.space);
        //     statusFree.push(flat.status === '4');
        // });

        return {
            price: {
                min: Math.min(...flats.map((flat) => flat.price)),
                max: Math.max(...flats.map((flat) => flat.price)),
            },
            floor: {
                min: Math.min(...flats.map((flat) => flat.floor)),
                max: Math.max(...flats.map((flat) => flat.floor)),
            },
            space: {
                min: Math.floor(Math.min(...flats.map((flat) => flat.space))),
                max: Math.ceil(Math.max(...flats.map((flat) => flat.space))),
            },
            sort: 'floor_1',
        };
    }

    public async getCommonFlats(query) { // Создаём спсисок табов жилищных комплексов, список домов жк и соответствующих им квартир с названиями жк и мин-макс параметры для формы фильтрации
        let data = this.parseRequest(query.params);

        const modsBtnList = query.modsBtnList; // утсанавливаем список табов жилищных комплексов
        const housesMods = query.params.housesMods ? query.params.housesMods.split('nzt;').map((item) => JSON.parse(item)) : [];

        let flats = [];

        if (modsBtnList.length > 1) {
            if (housesMods.length) {
                for (const item of housesMods) {
                    const items = await this.collection.find({...data.request, mod: item.mod, house: item.value}, data.parameters).toArray();
                    flats.push(...items);
                }
            } else {
                flats.push(...await this.collection.find(data.request, data.parameters).toArray());
            }
            flats = flats.filter((flat) => {
                if (modsBtnList.find((jk) => jk.value === flat.mod)) {
                    flat.jkName = modsBtnList.find((jk) => jk.value === flat.mod).name;
                    return true;
                } else {
                    return false;
                }
            });
        }

        return flats;
    }

    public async getCommonFlatsData(query) {
        const modsBtnList = await this.setModBtns(); // утсанавливаем список табов жилищных комплексов
        const mods = modsBtnList.map((item, i) => {
            if (i > 0) {
                return item.value;
            }
        });

        const findCriteria: any = {};
        if (query.mod || mods.length) {
            findCriteria.mod = query.mod ? {$in: query.mod.split(',')} : {$in: mods};
        }
        if (query.status) {
            findCriteria.status = {$in: query.status.split(',')};
        }
        if (query.type) {
            findCriteria.type = {$in: query.type.split(',')};
        }
        const flatsOfMod = await this.collection.find(findCriteria).toArray();
        const config = this.setMinMaxParams(flatsOfMod); // устанавливаем мин-макс параметры для формы фильтрации
        const housesBtnList = await this.setHousesBtns(query.mod, flatsOfMod, modsBtnList); // Устанавливаем спсиок домов жилищных комплексов

        return {config, modsBtnList, housesBtnList};
    }

    private async setModBtns() { // утсанавливаем список табов жилищных комплексов
        const objects = await this.objectCollection.find().toArray();
        const modsBtnList = [];
        if (objects.length) {
            modsBtnList.push({name: 'Все комплексы', value: ''});
            for (const item of objects) {
                const flatSnippet = await this.flatCollection.findOne({objectId: item._id.toString()}); // Проверяем включен ли блок квартир в объекте, если включен, то добавляем таб этого объекта
                const flatsCount = await this.collection.find({mod: item.mod}).count();
                if (flatSnippet && flatSnippet.switchOn && flatsCount) {
                    if (!modsBtnList.some((btn) => btn.value === item.mod)) {
                        modsBtnList.push({name: item.name, value: item.mod, objectId: item._id.toString()});
                    }
                }
            }
        }

        return modsBtnList;
    }

    private async setHousesBtns(mod, flatsOfMod, modsBtnList) { // Устанавливаем спсиок домов жилищных комплексов
        const housesBtnList = [];
        housesBtnList.push({name: 'Все корпуса', value: 'all'}); // Добавляем название жк в массив
        if (mod && mod.split(',').length === 1) {
            const jk = modsBtnList.find((item) => item.value === mod);
            housesBtnList.push({jk: jk.name});

            const flats = flatsOfMod.filter((flat) => flat.mod === jk.value);
            flats.sort((flat1, flat2) => flat1.house > flat2.house ? 1 : -1); // сортировка по возрастанию номера дома

            flats.forEach((item) => {
                if (!housesBtnList.some((btn) => btn.value === item.house)) {
                    housesBtnList.push({name: 'Корпус № ' + item.house, value: item.house, mod: jk.value});
                }
            });
        } else {
            modsBtnList.forEach((jk, i) => {
                if (i > 0) {
                    const flats = flatsOfMod.filter((flat) => flat.mod === jk.value);
                    flats.sort((flat1, flat2) => flat1.house > flat2.house ? 1 : -1);   // сортировка по возрастанию номера дома
                    if (flats.length) {
                        housesBtnList.push({jk: jk.name});        // При появлении нового жк, добавлять его название в массив
                        flats.forEach((item) => {
                            if (!housesBtnList.some((btn) => btn.value === item.house && btn.mod === item.mod)) {
                                housesBtnList.push({name: 'Корпус № ' + item.house, value: item.house, mod: jk.value});
                            }
                        });
                    }
                }
            });
        }
        return housesBtnList;
    }

    public async getConfig(query) {
        const data = this.parseRequest(query);
        const flats = await this.collection.find(data.request, data.parameters).toArray();
        const config = this.setMinMaxParams(flats);
        return {config};
    }

    public async getSearchConfig() {
        const modsBtnList = await this.setModBtns(); // утсанавливаем список табов жилищных комплексов
        const mods = modsBtnList.map((item, i) => {
            if (i > 0) {
                return item.value;
            }
        });
        const findByMod: any = mods.length ? {mod: {$in: mods}} : {};
        findByMod.type = {$in: ['КВ', 'АП']};
        const flatsOfMod = await this.collection.find(findByMod).toArray();
        const config = this.setMinMaxParams(flatsOfMod); // устанавливаем мин-макс параметры для формы фильтрации
        return config;
    }

    public parseRequest(query) {
        let request: any = {};

        if ('sections' in query) {
            request.section = {$in: query.sections.split(',').map(Number)};
        }
        if ('houses' in query) {
            request.house = {$in: query.houses.split(',')};
        }
        if ('mod' in query) {
            request.mod = {$in: query.mod.split(',')};
        }
        if ('rooms' in query && (/[0|1|2|3]/).exec(query.rooms)) {
            if ((/[3]/).exec(query.rooms)) {
                query.rooms = query.rooms + ',4,5,6'; // если выбраны 3+, то добавляем квартиры большей комнатности
            }
            request.rooms = {$in: query.rooms.split(',').map(Number)};
        }
        if ('priceMin' in query && 'priceMax' in query) {
            request.price = {$gte: Number(query.priceMin), $lte: Number(query.priceMax)};
        }
        if ('floorMin' in query && 'floorMax' in query) {
            request.floor = {$gte: Number(query.floorMin), $lte: Number(query.floorMax)};
        }
        if ('spaceMin' in query && 'spaceMax' in query) {
            request.space = {$gte: Number(query.spaceMin), $lte: Number(query.spaceMax)};
        }
        if ('floor' in query) {
            request.floor = Number(query.floor);
        }
        if ('number' in query) {
            request.flat = Number(query.number);
        }
        if ('type' in query) {
            request.type = {$in: query.type.split(',')};
        }
        if ('decoration' in query && query.decoration.split(',').every((item) => FormConfig.decorationList.some((i) => item === i.value))) {
            const decMas = query.decoration.split(',');
            if (decMas.some((item) => item === '03')) { // Если в отделке присутствует чистовая, в её же состав входят и многие другие отделки, подключаем их к поиску
                decMas.push(...FormConfig.extraDecorationList.map((item) => item.value));
            }
            request.decoration = {$in: decMas};
        }
        if ('status' in query && query.status.split(',').every((item) => FormConfig.statusList.some((i) => item === i.value))) {
            request.status = {$in: query.status.split(',')};
        }
        if ('isEuro' in query) {
            request.isEuro = true;
        }

        let parameters = {};

        if ('skip' in query && 'limit' in query) {
            parameters = {
                skip: Number(query['skip']),
                limit: Number(query['limit'])
            };
        }

        if ('sort' in query && query.sort === 'price_1') {
            parameters['sort'] = {price: 1};
        } else if ('sort' in query && query.sort === 'price_0') {
            parameters['sort'] = {price: -1};
        } else if ('sort' in query && query.sort === 'space_1') {
            parameters['sort'] = {space: 1};
        } else if ('sort' in query && query.sort === 'space_0') {
            parameters['sort'] = {space: -1};
        } else if ('sort' in query && query.sort === 'floor_1') {
            parameters['sort'] = {floor: 1};
        } else if ('sort' in query && query.sort === 'floor_0') {
            parameters['sort'] = {floor: -1};
        } else if ('sort' in query && query.sort === 'delivery_1') {
            parameters['sort'] = {deliveryDate: 1};
        } else if ('sort' in query && query.sort === 'delivery_0') {
            parameters['sort'] = {deliveryDate: -1};
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

    // setTomilinoRooms(request) {
    //     const hasTomilinoMod = request.mod.$in.some((mod) => mod === 'НТ');
    //     if (hasTomilinoMod) {
    //         const rooms = request.rooms.$in;
    //         if (request.isEuro) {
    //             rooms.map((room) => {
    //                 return room + 1;
    //             });
    //         } else {
    //             const newRooms = [];
    //             for (const room of rooms) {
    //                 newRooms.push(room);
    //                 newRooms.push(room + 1);
    //             }
    //         }
    //     }
    //
    // }

    public async getFavorites(session) {
        return session.favoriteFlats ? session.favoriteFlats : [];
    }

    public async setFavorites(session, flat) {

        if (session.favoriteFlats === undefined) {
            session.favoriteFlats = [];
        }

        const index = session.favoriteFlats.findIndex((item) => item.article === flat.article);
        if (index >= 0) {
            session.favoriteFlats.splice(index, 1);
        } else {
            session.favoriteFlats.push(flat);
        }

        return session.favoriteFlats;
    }

    public async refreshFavorites(session, flats) {
        session.favoriteFlats = flats;
        return 'OK';
    }
}
