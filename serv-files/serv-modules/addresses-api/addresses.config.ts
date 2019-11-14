export const ADDRESSES_COLLECTION_NAME = 'addresses';

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
