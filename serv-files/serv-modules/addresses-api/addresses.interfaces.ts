import * as moment from 'moment';
import _date = moment.unitOfTime._date;

export const ADDRESSES_COLLECTION_NAME = 'addresses';

/**
 * коды отделки
 * 00 << без отделки;
 * 01 << черновая;
 * 02 << ч/о без перегородок;
 * 03 << чистовая;
 * 04 << чистовая (светлая);
 * 05 << чистовая (темная);
 * 06 << ЯЛТА;
 * 07 << СОЧИ;
 * 08 << Классика;
 * 09 << Модерн;
 * 10 << Финишная отделка;
 */

/**
 *   ОБ   -   КВ   -   05  -  12  -  05  -  1010
 *   жк   тип кв/ап  секция  этаж  отделка  номер
 */

/* export interface IAddressItemFlat {
    _id?: string;
    article: string; // ОБ-КВ-05-12-05-1010
    type: string; // 'АП' - апартаменты, 'КВ' - квартира
    section: string;
    floor: number;
    flat: string;
    status: string;
    statusName: string;
    decoration: string;
    decorationName: string;
    rooms: string;
    space: number;
    price: number;
} */

export interface IAddressItemFlat {
    type?: string;
    house: number;
    section: number;
    floor: number;
    flat: number;
    status: string;
    statusName: string;
    decoration: string;
    decorationName: string;
    rooms: number;
    separateentrance: boolean;
    terrasescount: boolean;
    roofexit: boolean;
    twolevel: boolean;
    space: number;
    price: number;
    deliveryDate: string;
    _id?: any;
}

export interface IFlatWithDiscount extends IAddressItemFlat {
    discount: number;
}

export interface IFlatResponse {
    count: number;
    flats: IAddressItemFlat[];
}
