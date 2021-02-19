import { clientRender } from './utilits/client-render';
import { Response, Request } from 'express-serve-static-core';
import { NEWS_COLLECTION_NAME } from './news-api/news.interfaces';
import { MongoConnectionService } from './mongo-connection.service';
import { SHARES_COLLECTION_NAME } from './shares-api/shares.interfaces';
import { IObjectSnippet, OBJECTS_OBJECT_COLLECTION_NAME } from './jk-objects/object-api/objects.interfaces';
import { AddressesModel } from './addresses-api/addresses.model';
import { join } from "path";
import * as fs from "fs";
import { SERVER_CONFIGURATIONS } from './configuration';
const ObjectId = require('mongodb').ObjectID;

export const ROUTES: any[] = [
    '/',
    '/about',
    '/partners',
    '/contacts',
    '/news-shares/all',
    '/news-shares/news/list',
    {
        url: '/news-shares/news/list/:id',
        handle: async (req: any, res: Response, next) => {
            const validId =  ObjectId.isValid(req.params['id']);
            const news = (validId) ? await MongoConnectionService.getDb().connection.db.collection(NEWS_COLLECTION_NAME).findOne({ _id: ObjectId(req.params['id']) }) : null;
            (news) ? next() : clientRender(req, res, 404, req.session);
        },
    },
    '/news-shares/shares/list',
    {
        url: '/news-shares/shares/list/:id',
        handle: async (req: any, res: Response, next) => {
            const validId =  ObjectId.isValid(req.params['id']);
            const share = (validId) ? await MongoConnectionService.getDb().connection.db.collection(SHARES_COLLECTION_NAME).findOne({ _id: ObjectId(req.params['id']) }) : null;
            (share) ? next() : clientRender(req, res, 404, req.session);
        },
    },
    '/flats/search',
    '/objects/list',
    {
        url: '/objects/list/:id',
        handle: async (req: any, res: Response, next) => {
            const jkObject = await checkJkObject(req, res, next);
            if (!jkObject) {
                clientRender(req, res, 404, req.session)
            } else {
                next();
            }
        },
    },
    {
        url: '/objects/list/:id/flats',
        handle: async (req: any, res: Response, next) => {
            const jkObject = await checkJkObject(req, res, next);
            if (!jkObject) {
                clientRender(req, res, 404, req.session)
            } else {
                next();
            }
        },
    },
    {
        url: '/objects/list/:id/flats/house/:house',
        handle: async (req: any, res: Response, next) => {
            const jkObject = await checkJkObject(req, res, next);
            if (!jkObject) {
                clientRender(req, res, 404, req.session)
            } else {
                const completed = await checkFlatsHouse(req, res);
                if (completed) {
                    next();
                }
            }
        },
    },
    {
        url: '/objects/list/:id/flats/house/:house/section/:section/floor/:floor',
        handle: async (req: any, res: Response, next) => {
            const jkObject = await checkJkObject(req, res, next);
            if (!jkObject) {
                clientRender(req, res, 404, req.session);
            } else {
                const completed = await checkFlatsHouseSectionFloor(req, res, jkObject);
                if (completed) {
                    next();
                }
            }
        },
    },
    {
        url: '/objects/list/:id/flats/house/:house/section/:section/floor/:floor/apartment/:apartment',
        handle: async (req: any, res: Response, next) => {
            const jkObject =  await checkJkObject(req, res, next);
            if (!jkObject) {
                clientRender(req, res, 404, req.session)
            } else {
                const completedFloor = await checkFlatsHouseSectionFloor(req, res, jkObject);
                const completedFlat = await checkFlatsApartment(req, res);
                if (completedFloor && completedFlat) {
                    next();
                }
            }
        },
    },
    {
        url: '/objects/list/:id/dynamic/:year/:month',
        handle: async (req: any, res: Response, next) => {
            const jkObject = await checkJkObject(req, res, next);
            if (!jkObject) {
                clientRender(req, res, 404, req.session);
            } else {
                await checkDynamicMonthAndYear(req, res, next);
            }
        },
    },
    '/favorites',
];

function checkDynamicMonthAndYear(req: any, res: Response, next) {
    if ( req.params.month && req.params.year && req.params.id ) {

        // удаляем все символы из параметров кроме чисел ( возможно случайно попавшие )
        const month = req.params.month.replace(/[^0-9]/g, '');
        const year = req.params.year.replace(/[^0-9]/g, '');

        // если в обоих параметрах есть цифры
        if ( month.length > 0 && year.length > 0
            // проверяем 'year' на соответствие диапазону от 2017го до текущего года
            && Number(year) >= 2017 && Number(year) <= Number(new Date().getFullYear())
            // проверяем 'month' на соответствие диапазону от 1 до 12
            && Number(month) >= 1 && Number(month) <= 12 ) {
            console.log('CHECK OK');
            next();

            // иначе 404 статус
        } else {
            console.log('CHECK1');
            clientRender(req, res, 404, req.session);
        }
    } else {
        console.log('CHECK2');
        clientRender(req, res, 404, req.session);
    }
}

async function checkJkObject(req: any, res: Response, next): Promise<IObjectSnippet> {
    const validId =  ObjectId.isValid(req.params['id']);
    const jkObject = (validId) ? await MongoConnectionService.getDb().connection.db.collection(OBJECTS_OBJECT_COLLECTION_NAME).findOne({ _id: ObjectId(req.params['id']) }) : null;
    if (!jkObject) {
        clientRender(req, res, 404, req.session);
    } else {
        return jkObject;
    }
}

async function getFlatsData(objectId) {
    const addressesModel = new AddressesModel(MongoConnectionService.getDb().connection.db);
    const data = addressesModel.getObjectFlatsData(objectId);
    return data;
}

async function checkFlatsHouse(req: any, res: Response) {
    const data = await getFlatsData(req.params.id);
    const houseNumbers = req.params.house === 'all' ? Object.keys(data.floorCount) : req.params.house.split(',');
    let completed = true;
    houseNumbers.forEach((houseNumber) => {
        if (!data.floorCount[houseNumber]) {
            clientRender(req, res, 404, req.session);
            completed = false;
            return;
        }
    });
    return completed;
}

async function checkFlatsHouseSectionFloor(req: any, res: Response, jkObject) {
    const data = await getFlatsData(req.params.id);
    const floorCount = data.floorCount;
    if (!floorCount[req.params.house] || !floorCount[req.params.house][req.params.section]
        || !floorCount[req.params.house][req.params.section].some((floor) => floor === Number(req.params.floor))) {
        clientRender(req, res, 404, req.session);
        return false;
    }

    const dir = join(SERVER_CONFIGURATIONS.DIST_FOLDER, '../', 'dist', 'desktop', 'assets', 'floor-plans', `jk_${jkObject.mod}`, `house_${req.params.house}`,
        `section_${req.params.section}`, `floor_${req.params.floor}`, `sect_${req.params.section}_fl_${req.params.floor}.svg`);

    const floorSchemeExist = fs.existsSync(dir);
    if (!floorSchemeExist) {
        clientRender(req, res, 404, req.session);
        return false;
    }

    return true;
}

async function checkFlatsApartment(req: any, res: Response) {
    const data = await getFlatsData(req.params.id);
    const addressesModel = new AddressesModel(MongoConnectionService.getDb().connection.db);
    const query = {mod: data.jk.mod};
    const flats = await addressesModel.getObjectsFlats(query);
    const flat = flats.find((item) => item.flat === req.params.apartment);
    if (!flat) {
        clientRender(req, res, 404, req.session);
        return false;
    } else {
        return true;
    }
}
