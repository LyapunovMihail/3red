import {
    ADDRESSES_COLLECTION_NAME,
    IAddressItemFlat,
} from '../addresses-api/addresses.config';
import * as request from 'request';
import * as cron from 'cron';
import {
    Writable,
} from 'stream';
import * as JSONStream from 'JSONStream';
import { DbJsonObject } from './db.types';
import { IObjectSnippet, OBJECTS_OBJECT_COLLECTION_NAME } from '../jk-objects/object-api/objects.interfaces';
const url = 'http://incrm.ru/export-tred/ExportToSite.svc/ExportToTf/json';
const CronJob = cron.CronJob;

export class DbCronUpdate {

    collectionName = OBJECTS_OBJECT_COLLECTION_NAME;
    collection: any;
    objects: IObjectSnippet[];

    public counter: number;

    constructor(public db: any) {
        this.collection = db.collection(this.collectionName);
        this.counter = 0;
        this.start();
    }

    public start() {
        this.requestBase();
        const task = new CronJob('0 13,19 * * *', () => {
            this.requestBase();
        }, false);
        task.start();
    }

    public async requestBase() {

        this.objects = await this.collection.find().toArray();
        this.counter = 0;

        const collectionAddresses = this.db.collection(ADDRESSES_COLLECTION_NAME);

        // Create request, parse, process streams
        const requestStream = request.get({url, json: true});
        const parserStream = JSONStream.parse('*');
        const processingStream = new Writable({
            write: async (object, encoding, callback) => {
                const item = this.transformFlatItem(object);
                if (item != null) {
                    await collectionAddresses.insert(item);
                }
                callback();
            },
            objectMode: true,
        });

        const errorHandler = (err, name) => {
            const errorText = `${name} error. ${(new Date())} DB UPDATE FAILED WITH ERROR: ${err};`;
            console.log(errorText, err);
        };

        requestStream
            .on('error', (err) => errorHandler(err, 'requestStream'))
            .on('response', async (res) => {
                console.log(`DB update request ${(new Date())}, response status code ${res.statusCode};`);
                if (res.statusCode === 200) {
                    await collectionAddresses.remove({});
                }
            })
            .on('end', () => console.log(`requestStream is ended ${(new Date())};`))
            .pipe(parserStream)
            .on('error', (err) => errorHandler(err, 'parserStream'))
            .pipe(processingStream)
            .on('error', (err) => errorHandler(err, 'processingStream'));

        processingStream.on('finish', async () => {
            try {
                console.log(`processingStream is finished ${(new Date())}; DB HAS BEEN UPDATED; flats count: ${this.counter}`);
            } catch (err) {
                errorHandler(err, 'test base rename');
            }
        });
    }

    public transformFlatItem(object: DbJsonObject) {
        if (('Article' in object) && !this.objects.some((jk) => jk.mod === object.Article.split('-')[0])) { // Если жилой комплекс этой квартиры создан, она добавляется в бд
            return;
        }
        const {mod, house, section, floor, flat} = this.parseArticle(object.Article);
        const itemflat: IAddressItemFlat = {
            mod,
            house,
            section,
            floor,
            rooms: Number(object.Rooms),
            flat,
            status: object.StatusCode,
            statusName: object.StatusCodeName,
            decoration: object.Finishing,
            decorationName: object.Decoration,
            separateentrance: (object.SeparateEntrance === '1'),
            terrasescount: (Number(object.TerrasesCount) > 0),
            roofexit: (object.RoofExit === '1'),
            twolevel: (object['2level'] === '1'),
            space: Number(object.Quantity),
            price: Number(object.Sum),
            deliveryDate: object.DeliveryPeriodDate,
            article: object.Article
        };
        this.counter++;
        return itemflat;
    }

    private parseArticle(article: string) {
        // ТОМ-03-01-04-02-018
        if (!article.startsWith('МКВ')) {
            const [mod, house, sectionStr, floorStr, , flatStr] = article.split('-');
            const [section, floor, flat] = [sectionStr, floorStr, flatStr].map(Number);
            return {
                mod,
                house,
                section,
                floor,
                flat,
            };
        } else {
            const [mod, houseStr, , floorStr, , flatStr] = article.split('-');
            const [section, floor, flat] = [houseStr.slice(-1), floorStr, flatStr].map(Number); // обрезаем из корпуса последнюю цифру и ставим её в секцию
            const house = this.parseHouseNumber(houseStr.slice(0, 2)); // берём из названия дома первые 2 символа
            return {
                mod,
                house,
                section,
                floor,
                flat,
            };
        }
    }

    private parseHouseNumber(number: string): string { // меняем символы русской раскладки на латинские a b
        if (number.endsWith('А')){
            return number.slice(0, number.length - 1) + 'a';
        } else if (number.endsWith('Б')) {
            return number.slice(0, number.length - 1) + 'b';
        }
    }
}
