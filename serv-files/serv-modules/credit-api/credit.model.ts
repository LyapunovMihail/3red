import { imageSaver } from './../utilits/image-saver.utilits';
import { ICreditSnippet, CREDIT_UPLOADS_PATH, CREDIT_COLLECTION_NAME } from './credit.interfaces';
import * as dateFormat from 'dateformat';
const ObjectId = require('mongodb').ObjectID;

export class CreditModel {

    collectionName = CREDIT_COLLECTION_NAME;

    collection: any;

    constructor(public db: any) {
        this.collection = db.collection(this.collectionName);
    }

    async getAllSnippet() {
        return await this.collection.find().sort({created_at: -1}).toArray();
    }

    async getActiveSnippet() {
        return await this.collection.find({active: true}).sort({created_at: -1}).toArray();
    }

    async getActiveSnippetWithParams(params) {

        const snippets = await this.collection.find(
            {
                active: true,
                initial: {$lte: params.initial},
                deadline: {$gte: params.deadline},
                // military: params.military,
                // maternal: params.maternal,
                // nationality: params.nationality
            })
            .sort({created_at: -1}).toArray();

        return snippets;
    }

    async setSnippet(banks) {
        const date = new Date();
        await this.collection.remove({});
        const banksSnippets = [];
        banks.forEach((bank) => {
            const created_at = dateFormat(date, 'yyyy-mm-ddTHH:MM:ssZ');
            const snippet: ICreditSnippet = {
                name: bank.name,
                image: bank.image,
                cssclass: bank.cssclass,
                percent: 0,
                initial: 0,
                deadline: 0,
                // military: false,
                // maternal: false,
                // nationality: false,
                active: true,
                created_at,
            };
            banksSnippets.push(snippet);
        });

        await this.collection.insertMany(banksSnippets);
        return await this.getAllSnippet();
    }

    async deleteSnippet(id) {
        if ( id &&  ObjectId.isValid(id) ) {
            await this.collection.deleteOne({ _id : ObjectId(id) });
            return await this.getActiveSnippet();
        } else {
            throw new Error('Не корректный id.');
        }
    }

    async updateSnippet(id, key, value) {
        switch (key) {
            case 'percent':
            case 'initial':
            case 'deadline':
            // case 'military':
            // case 'maternal':
            // case 'nationality':
            case 'active':

                // если key - правильный но нет его значения, отдается ошибка
                if ( value === undefined ) {
                    throw new Error(`Не передано значение ${key}`);
                }
                if ((key === 'initial' || key === 'percent' || key === 'deadline') && typeof value !== 'number') {
                    throw new Error(`значение ${key} не цифровые, печатайте цифры`);
                }
                // если id валиден обновляем базу
                if ( ObjectId.isValid(id) ) {

                    const options = {};
                    options[key] = value;

                    await this.collection.update({ _id : ObjectId(id) }, {$set: options });
                    return await this.getActiveSnippet();

                } else {
                // если id не валиден, отдается ошибка
                    throw new Error('Не корректный id.');
                }

            // если key не подходит не по одному из трех допустимых значений
            default:
                throw new Error('Изменяемый параметр указан не корректно, или такого параметра не может быть.');
        }
    }

    async uploadSnippetImage(req) {
        const path = CREDIT_UPLOADS_PATH;
        const image = await imageSaver(req, path, 50);
        await this.collection.update({_id: ObjectId(req.headers.id)}, {$set: { image }});
        return await this.getActiveSnippet();
    }
}
