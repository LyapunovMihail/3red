import { imageSaver, thumbnailSaver, fileExtension } from '../../utilits/image-saver.utilits';
import { OBJECTS_DYNAMIC_COLLECTION_NAME, OBJECTS_DYNAMIC_UPLOADS_PATH, ErrorNotCorrectArguments, IObjectDynamicSnippet } from './objects-dynamic.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsDynamicModel {

    collectionName = OBJECTS_DYNAMIC_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(objectId?, year?, month?) {
        const findCriteria: any = objectId ? {objectId} : {};
        if (year) {
            findCriteria.year = Number(year);
        }
        if (month) {
            findCriteria.month = Number(month);
        }
        return await this.collection.findOne(findCriteria);
    }

    async getSnippets(objectId) {
        const findCriteria: any = objectId ? {objectId} : {};
        return await this.collection.find(findCriteria).toArray();
    }
    public async getCompletedObject(objectId) {
        let objects = await this.collection.find({ objectId }).sort({ year: -1, month: -1 }).toArray();
        objects = await [].concat.apply([], objects.map(el => el.objects)); // Объединяем в один массив все созданые объекты
        objects = await objects.filter((el, i, arr) => {
            if (el.ready === 100 && el.show) {
                const newArr = arr.map(item => item.title).filter((item, j, list) => list.indexOf(item) === j);
                return el.title === newArr[i];
            }
            return false;
        }); // Отфильтровываем не готовые и дубликаты
        return objects;
    }

    async updateSnippet(parameters) {
        const options: IObjectDynamicSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), { objectId: options.objectId, year: options.year, month: options.month }, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({ objectId : options.objectId, year: options.year, month: options.month }, { $set : options }, {upsert: true});
        });
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.jpg' ) {
            const path = OBJECTS_DYNAMIC_UPLOADS_PATH;
            const image = await imageSaver(req, path, 50);
            const thumbnail = await thumbnailSaver(req, path, {width: '540', height: '420'});
            return ({
                image,
                thumbnail,
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
    }

    async getLastMonthValue(objectId) {
        const array: IObjectDynamicSnippet[] = await this.getSnippets(objectId);

        if ( array.length > 0 ) {
            const lastYear = array.reduce((prev, cur, index, arr) => {
                if (Number(cur.year) > Number(prev.year)) {
                    return cur;
                } else {
                    return prev;
                }
            }).year;

            const lastMonth = array.filter((val) => {
                return Number(val.year) === Number(lastYear);
            }).reduce((prev, cur, index, arr) => {
                if (Number(cur.month) > Number(prev.month)) {
                    return cur;
                } else {
                    return prev;
                }
            }).month;

            return ({ year: lastYear, month: lastMonth });

        } else {
            const date = new Date();
            return ({ year: date.getFullYear(), month: ( date.getMonth() + 1 ) });
        }
    }

    // обертка для возврата ошибки о неверно переданных параметрах
    async errorParamsCatcher(val, params, fn) {
        if ( val ) {
            await fn();
            return await this.getSnippet(params.objectId, params.year, params.month);
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры
        return ('objectId' in options && 'created_at' in options && 'last_modifyed' in options && 'month' in options  && 'year' in options  && 'objects' in options);
    }

}
