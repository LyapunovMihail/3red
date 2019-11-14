import { imageSaver, thumbnailSaver, fileExtension } from './../utilits/image-saver.utilits';
import { INewsSnippet, EnumNewsSnippet, NEWS_UPLOADS_PATH, NEWS_COLLECTION_NAME, ErrorNotCorrectArguments } from './news.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class NewsModel {

    collectionName = NEWS_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    // поиск новостей
    async getSnippet(id?) {
        const findCriteria = id ? {_id: ObjectId(id)} : {category: EnumNewsSnippet.NEW};
        return await this.collection.find(findCriteria).sort({ created_at: -1 }).toArray();
    }

    // новость для главной страницы
    async getMainSnippet() {
        return await this.collection.find({ show_on_main: true, category: EnumNewsSnippet.NEW }).toArray();
    }

    // создание новости
    async setSnippet(parameters) {
        const options: INewsSnippet = parameters;
        return await this.errorParamsCatcher( this.valuesReview(options), async () => {
            const created = await this.collection.insert(options);
        });
    }

    // обновление новости
    async updateSnippet(id, parameters) {
        const options: INewsSnippet = parameters;
        return await this.errorParamsCatcher( ( this.valuesReview(options) && ObjectId.isValid(id) ), async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            const created = await this.collection.updateOne({ _id : ObjectId(id) }, { $set : options });
        });
    }

    // удаление новости
    async deleteSnippet(id) {
        return await this.errorParamsCatcher(ObjectId.isValid(id), async () => {
            await this.collection.deleteOne({ _id : ObjectId(id) });
        });
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.jpg' ) {
            const path = NEWS_UPLOADS_PATH;
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
    async errorParamsCatcher(val, fn) {
        if ( val ) {
            await fn();
            return await this.getSnippet();
        } else {
            throw new Error(ErrorNotCorrectArguments);
        }
    }

    private valuesReview(options) {
        // если есть все параметры : 'created_at', 'last_modifyed', 'title', 'description', 'image', 'thumbnail', 'category', 'show_on_main'
        // а так же если 'category' равна одному из значений EnumNewsSnippet
        return ( ( 'created_at' in options && 'last_modifyed' in options && 'title' in options
        && 'description' in options && 'image' in options && 'thumbnail' in options
        && 'category' in options && 'show_on_main' in options && 'icon_mod' in options
        && ( options.category === EnumNewsSnippet.NEW || options.category === EnumNewsSnippet.SHARE ) )  ? true : false );
    }

}
