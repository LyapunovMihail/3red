import { imageSaver, thumbnailSaver, fileExtension } from '../../utilits/image-saver.utilits';
import {
    IObjectDecorationSnippet,
    ErrorNotCorrectArguments,
    OBJECTS_DECORATION_UPLOADS_PATH, OBJECTS_DECORATION_COLLECTION_NAME, IDecorationImage, IDecorationInfo
} from './objects-decoration.interfaces';
import { IObjectDecorationTab, IObjectTabsSnippet } from '../tabs-api/objects-tabs.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsDecorationModel {

    collectionName = OBJECTS_DECORATION_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(objectId?, tab?, type?) {
        let findCriteria: any = objectId ? {objectId} : {};

        // if (tab && tab !== 'null') { // при передаче в строку запросов параметров, на выходе они конвертируются в строку. Не стал менять метод на пост, и так понятно что имеется в виду присутствие вкладки в параметрах
        //     findCriteria = {...findCriteria, tab};
        // }
        // if (type && type !== 'null') {
        //     findCriteria = {...findCriteria, type};
        // }

        return await this.collection.findOne(findCriteria);
    }

    async updateSnippet(parameters) {
        const options: IObjectDecorationSnippet = parameters;
        console.log('form: ', options);
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({ objectId : options.objectId }, { $set : options }, {upsert: true});
        });
    }

    async removeTabSlides(parameters) {
        const options: IObjectTabsSnippet = parameters;
        const tabs = parameters.decoration;
        tabs.push('no-tab');
        // let mas = [];
        // mas.push(
        //     {
        //         images: [],
        //         info: [],
        //         tab: {
        //             name: 'name',
        //             show: true,
        //             turnOnDecorationTypes: true,
        //             decorationType: 'dec'
        //         }
        //
        //     },
        //     {
        //         images: [],
        //         info: [],
        //         tab: {
        //             name: 'name',
        //             show: true,
        //             turnOnDecorationTypes: true,
        //             decorationType: 'duc'
        //         }
        //
        //     },
        //     {
        //         images: [],
        //         info: [],
        //         tab: {
        //             name: 'name',
        //             show: true,
        //             turnOnDecorationTypes: false
        //         }
        //
        //     }
        //     );
        return await this.errorParamsCatcher('objectId' in options, options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({ objectId : options.objectId }, { $pull : {data: {tab: {$nin: tabs}}}});  // удаляем из массива слайдов те что не относятся ни к одному существующему табу и no-tab'у
        });
    }

    async deleteSnippet(objectId) {
        return await this.collection.deleteOne({objectId});
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.jpg' ) {
            const path = OBJECTS_DECORATION_UPLOADS_PATH;
            const image = await imageSaver(req, path, 50);
            const thumbnail = await thumbnailSaver(req, path, {width: '300', height: '200'});
            return ({
                image,
                thumbnail,
            });
        } else {
            throw new Error('Не допустимое расширение файла.');
        }
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
        return ( ( 'objectId' in options && 'created_at' in options && 'last_modifyed' in options && 'data' in options ) || 'objectId' in options && 'switchOn' in options ? true : false );
    }

}
