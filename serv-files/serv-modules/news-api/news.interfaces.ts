import { ShareBodyBlock, ShareBodyEnum, ShareFlat } from '../shares-api/shares.interfaces';

export const NEWS_COLLECTION_NAME = 'news';

export const NEWS_UPLOADS_PATH = 'uploads/news/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface INewsSnippet {
    _id?: any ;
    created_at: string ;
    last_modifyed: string ;
    category: EnumNewsSnippet ;
    title: string ;
    description: string ;
    descrPreview: string ;
    show_on_main: boolean ;
    image: string ;
    thumbnail: string ;
    icon_mod: string ;
    show_large: boolean;
    objectId?: string;
    objectName?: string;
    body: NewsBodyBlock[];
}

export enum EnumNewsSnippet {
    SHARE = 'SHARE',
    NEW = 'NEW'
}

export enum NewsBodyEnum {
    DESCRIPTION = 'description',
    HEADER = 'header',
    IMAGE = 'image',
    IMAGE2 = 'image2'
}

export interface NewsBodyBlock {
    blockType: NewsBodyEnum;
    blockOrderNumber: number;
    blockDescription?: string;
    blockList?: string[];
    blockImg?: {
        image: string;
        thumbnail: string;
    };
    blockImg2?: {
        image: string;
        thumbnail: string;
        image2: string;
        thumbnail2: string;
    };
}
