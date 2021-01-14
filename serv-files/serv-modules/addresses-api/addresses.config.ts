export const ADDRESSES_COLLECTION_NAME = 'addresses';

export interface IAddressItemFlat {
    type?: string;
    mod: string;
    jkName?: string;
    house: string;
    section: number;
    floor: number;
    flat: number;
    status: string;
    statusName: string;
    decoration: string;
    decorationName: string;
    rooms: number;
    eRooms: number;
    separateentrance: boolean;
    terrasescount: boolean;
    roofexit: boolean;
    twolevel: boolean;
    isEuro: boolean;
    space: number;
    price: number;
    deliveryDate: string;
    article: string;
    articleId: string;
    inFavorite?: boolean;
    floorsInSection: number;
    flatsInFloor: number;
    _id?: any;
}

export interface IFlatWithDiscount extends IAddressItemFlat {
    discount: number;
}
