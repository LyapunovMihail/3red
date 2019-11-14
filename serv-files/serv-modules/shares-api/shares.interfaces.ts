import { IAddressItemFlat } from '../addresses-api/addresses.interfaces';

export const SHARES_COLLECTION_NAME = 'shares';

export const SHARES_UPLOADS_PATH = 'uploads/shares/';

export const SHARES_CREATE_ID = '0000-0000-0000';

export enum ShareFlatDiscountType {
    PERCENT = 'percent',
    SUM = 'sum'
}

export interface ShareFlat extends IAddressItemFlat {
    discountType: ShareFlatDiscountType;
    discountValue: number;
}

export interface Share {
    _id?: any;
    name: string;
    text: string;
    textPreview: string;
    mainImage: string;
    mainThumbnail: string;
    countdown: boolean;
    created_at: string;
    finish_date: string;
    requestBtn: boolean;
    show_on_main: boolean;
    shareFlats: ShareFlat[];
}
