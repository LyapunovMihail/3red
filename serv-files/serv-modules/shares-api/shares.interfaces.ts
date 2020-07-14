export const SHARES_COLLECTION_NAME = 'shares';

export const SHARES_UPLOADS_PATH = 'uploads/shares/';

export const SHARES_CREATE_ID = '0000-0000-0000';

export enum ShareFlatDiscountType {
    PERCENT = 'percent',
    SUM = 'sum'
}

export enum ShareBodyEnum {
    DESCRIPTION = 'description',
    HEADER = 'title',
    IMAGE = 'image',
    FLATS = 'flats'
}

export enum ShareFlatRoomEnum {
    STUDIO = 'Студия',
    ONE_ROOM = '1-комн.',
    TWO_ROOM = '2-комн.',
    THREE_ROOM = '3-комн.'
}

export enum ShareFlatDecorationEnum {
    WITHOUT = 'Без отделки',
    ROUGHING = 'Черновая отделка',
    WITHOUT_WITH_WALLS = 'Б/о с перегородками',
    CLEAN = 'Чистовая отделка',
    FINISH = 'Финишная отделка',
    LIGHT = 'Светлая',
    DARK = 'Темная'
}

export interface ShareFlat {
    mod: string;
    jkName: string;
    deliveryDate: string;
    house: string;
    number: string;
    section: string;
    floor: string;
    space: string;
    room: ShareFlatRoomEnum;
    decoration: ShareFlatDecorationEnum;
    decorationName: ShareFlatDecorationEnum;
    scheme: string;
    price: string;
    discountType: ShareFlatDiscountType;
    discount: string;
}

export interface ShareBodyBlock {
    blockType: ShareBodyEnum;
    blockOrderNumber: number;
    blockDescription?: string;
    blockTitle?: string;
    blockImg?: {
        image: string;
        thumbnail: string;
    };
    blockFlat?: ShareFlat;
}

export interface Share {
    _id?: any;
    name: string;
    text: string;
    mainImage: string;
    mainThumbnail: string;
    publish: boolean;
    countdown: boolean;
    created_at: string;
    finish_date: string;
    show_on_main: boolean;
    body: ShareBodyBlock[];
    objectId?: string;
    objectName?: string;
    shareCount: ShareCount;
}

export interface ShareCount {
    vk: number;
    fb: number;
    ok: number;
}
