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
        // const task = new CronJob('0 8,13,19,23 * * *', () => {
        const task = new CronJob('0 * * * *', () => {
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
                // console.log('item: ', item);
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
        if (('Article' in object) && !this.objects.some((jk) => jk.mod === object.Article.split('-')[0])) { // ???????? ?????????? ???????????????? ???????? ???????????????? ????????????, ?????? ?????????????????????? ?? ????
            return;
        }
        if (object.Article.split('-')[0] === '????' && object.StatusCode === '1') {
            return;
        }
        const {mod, house, section, floor, flat} = this.parseArticle(object.Article);
        const type = this.parseType(object.ArticleTypeCode, object.articleSubTypeCode);
        const itemflat: IAddressItemFlat = {
            mod,
            house,
            section,
            floor,
            rooms: Number(object.Rooms),
            flat,
            type,
            status: object.StatusCode,
            statusName: object.StatusCodeName,
            decoration: object.Finishing,
            decorationName: object.Decoration,
            separateentrance: (object.SeparateEntrance === '1'),
            terrasescount: (Number(object.TerrasesCount) > 0),
            roofexit: (object.RoofExit === '1'),
            twolevel: (object['2level'] === '1'),
            isEuro: object.IsEuro === '1',
            eRooms: mod === '??????' && object.IsEuro === '1' ? Number(object.Rooms) - 1 : Number(object.Rooms), // ???????? ?????????? ???????????? ??????????????, ???? ?? ?????????????????? ?????? ???????? ?????????????? ????????????????
            space: Number(object.Quantity),
            price: mod === '????' ? Number(object.Sum) + 30000 : Number(object.Sum),
            deliveryDate: object.DeliveryPeriodDate,
            article: object.Article,
            articleId: object.ArticleID,
            floorsInSection: Number(object.planid.split('/')[0]),
            flatsInFloor: Number(object.planid.split('/')[1]),
        };

        this.counter++;
        return itemflat;
    }

    private parseType(articleType, subArticleType) {

        subArticleType = subArticleType ? subArticleType.toString() : null;

        switch (articleType) {
            case '2':
                return '????';
            case '4':
                return '????';
            case '8':
                switch (subArticleType) {
                    case '2':
                        return '????';
                    case '4':
                        return '????';
                    case '8':
                        return '????';
                    case '16':
                        return '????';
                }
                break;
        }
    }

    private parseArticle(article: string) {
        // ??????-03-01-04-02-018
        if (article.startsWith('??????')) {
            const [mod, houseStr, , floorStr, , flatStr] = article.split('-');
            const [section, floor, flat] = [houseStr.slice(-1), floorStr, flatStr].map(Number); // ???????????????? ???? ?????????????? ?????????????????? ?????????? ?? ???????????? ???? ?? ????????????
            const house = this.parseHouseNumber(houseStr.slice(0, 2)); // ?????????? ???? ???????????????? ???????? ???????????? 2 ??????????????
            return {
                mod,
                house,
                section,
                floor,
                flat,
            };
        } else if (article.startsWith('????')) {
            const [mod, , sectionStr, floorStr, , flatStr] = article.split('-');
            const [section, floor, flat] = [sectionStr, floorStr, flatStr].map(Number);
            return {
                mod,
                house: '1',
                section,
                floor,
                flat,
            };
        } else if (article.startsWith('????')) {
            const [mod, , sectionStr, floorStr, , flatStr] = article.split('-');
            const [section, floor, flat] = [sectionStr, floorStr, flatStr].map(Number);
            return {
                mod,
                house: section === 1 || section === 2 || section === 3 ? '1' : '2',
                section,
                floor,
                flat,
            };
        } else {
            const [mod, houseStr, sectionStr, floorStr, , flatStr] = article.split('-');
            const [house, section, floor, flat] = [houseStr, sectionStr, floorStr, flatStr].map(Number);
            return {
                mod,
                house: house.toString(),
                section,
                floor,
                flat,
            };
        }
    }

    private parseHouseNumber(number: string): string { // ???????????? ?????????????? ?????????????? ?????????????????? ???? ?????????????????? a b
        if (number.endsWith('??')){
            return number.slice(0, number.length - 1) + 'a';
        } else if (number.endsWith('??')) {
            return number.slice(0, number.length - 1) + 'b';
        }
    }
}
