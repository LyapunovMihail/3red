import { imageSaver, thumbnailSaver, fileExtension } from '../../utilits/image-saver.utilits';
import {
    IObjectGallerySnippet,
    ErrorNotCorrectArguments,
    OBJECTS_GALLERY_UPLOADS_PATH, OBJECTS_GALLERY_COLLECTION_NAME
} from './objects-gallery.interfaces';
import { IObjectGalleryTabs, IObjectTabsSnippet } from '../tabs-api/objects-tabs.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class ObjectsGalleryModel {

    collectionName = OBJECTS_GALLERY_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(objectId?, tab?) {
        const findCriteria = objectId ? {objectId} : {};

        const result = await this.collection.findOne(findCriteria);

        if (result && result.image_data && tab && tab !== 'null') { // при передаче в строку запросов параметров, на выходе они конвертируются в строку. Имеется в виду присутствие вкладки в параметрах
            result.image_data = result.image_data.filter((slide) => slide.tab === tab);
        }
        return result;
    }

    async updateSnippet(parameters) {
        const options: IObjectGallerySnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({ objectId : options.objectId }, { $set : options }, {upsert: true});
        });
    }

    async removeTabSlides(parameters) {
        const options: IObjectTabsSnippet = parameters;
        const tabs = parameters.gallery.map((tab) => tab.name);
        tabs.push('no-tab');
        return await this.errorParamsCatcher('objectId' in options, options.objectId, async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({ objectId : options.objectId }, { $pull : {image_data: {tab: {$nin: tabs}}}});  // удаляем из массива слайдов те что не относятся ни к одному существующему табу и no-tab'у
        });
    }

    async deleteSnippet(objectId) {
        return await this.collection.deleteOne({objectId});
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.jpg' ) {
            const path = OBJECTS_GALLERY_UPLOADS_PATH;
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
        return ( ( 'objectId' in options && 'created_at' in options && 'last_modifyed' in options && 'image_data' in options ) || 'objectId' in options && 'switchOn' in options ? true : false );
    }

}
