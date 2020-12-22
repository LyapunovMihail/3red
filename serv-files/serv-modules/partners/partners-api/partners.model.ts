import { ErrorNotCorrectArguments, IPartnersSnippet, PARTNERS_COLLECTION_NAME, PARTNERS_UPLOADS_PATH } from './partners.interfaces';
import { iconSaver, fileExtension } from '../../utilits/image-saver.utilits';

const ObjectId = require('mongodb').ObjectID;

export class PartnersModel {

    collectionName = PARTNERS_COLLECTION_NAME;

    collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }

    async getSnippet(tab?) {
        const findCriteria = {};

        const result = await this.collection.findOne(findCriteria);

        if (result && result.uk && tab && tab !== 'null') { // при передаче в строку запросов параметров, на выходе они конвертируются в строку. Имеется в виду присутствие вкладки в параметрах
            result.uk = result.uk.filter((slide) => slide.tab === tab);
        }
        return result;
    }

    async updateSnippet(parameters) {
        const options: IPartnersSnippet = parameters;
        return await this.errorParamsCatcher(this.valuesReview(options), async () => {
            // удаление _id из параметров если он там есть
            if ( '_id' in options ) { delete options._id; }
            await this.collection.update({}, { $set : options }, {upsert: true});
        });
    }

    async deleteSnippet(objectId) {
        return await this.collection.deleteOne({objectId});
    }

    async uploadImage(req) {
        if (fileExtension(req.files.file.originalFilename) === '.png'  || fileExtension(req.files.file.originalFilename) === '.svg') {
            const path = PARTNERS_UPLOADS_PATH;
            const icon = await iconSaver(req, path);
            return ({
                icon
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
        // если есть все параметры
        return 'created_at' in options && 'last_modifyed' in options && 'uk' in options;
    }

}
