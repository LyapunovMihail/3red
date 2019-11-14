import { TRIGGER_COLLECTION_NAME, ITriggerSnippet } from './trigger.interfaces';
const ObjectId = require('mongodb').ObjectID;

export class TriggerModel {

    private collectionName = TRIGGER_COLLECTION_NAME;

    private collection: any;

    constructor( public db: any ) {
        this.collection = db.collection(this.collectionName);
    }


    async getSnippet() {
        const triggers = await this.collection.find().toArray();
        if (triggers.length === 0) {
           await this.setSnippet();
        }

        return await this.collection.find().toArray();
    }

    private async setSnippet() {
        const snippets: ITriggerSnippet[] = [
            { rooms_space: 'Студии (33-37 м²)', price: '6,7' },
            { rooms_space: '1 комн. (42-54 м²)', price: '7,7' },
            { rooms_space: '2 комн. (59-70 м²)', price: '9,7' },
            { rooms_space: '3 комн. (85-91 м²)', price: '13,5' }
        ];

        await this.collection.insertMany(snippets);
    }

    async updateSnippet(id, key, value) {
        // key может быть rooms_space/price
        switch (key) {
            case 'rooms_space':
            case 'price':

                // если key - правильный но нет его значения, отдается ошибка
                if ( value === undefined ) { throw new Error(`Не передано значение ${key}`); }

                // если id валиден обновляем базу
                if ( ObjectId.isValid(id) ) {

                    let options = {};

                    options[key] = value;

                    await this.collection.update({ _id : ObjectId(id) }, {$set: options });
                    return await this.getSnippet();

                } else {
                    // если id не валиден, отдается ошибка
                    throw new Error('Не корректный id.');
                }

          // если key не подходит не по одному из трех допустимых значений
            default:
                throw new Error('Изменяемый параметр указан не корректно, или такого параметра не может быть.');
        }
    }

}
