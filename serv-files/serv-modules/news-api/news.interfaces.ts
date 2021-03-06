export const NEWS_COLLECTION_NAME = 'news';

export const NEWS_UPLOADS_PATH = 'uploads/news/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface INewsSnippet {
    _id?: any ;
    created_at: string ;
    last_modifyed: string ;
    title: string ;
    description: string ;
    show_on_main: boolean ;
    show_on_promo: boolean;
    publish: boolean;
    image: string ;
    thumbnail: string ;
    objectId?: string;
    objectName?: string;
    shareCount: ShareCount;
    body: NewsBodyBlock[];
}

export enum NewsBodyEnum {
    DESCRIPTION = 'description',
    HEADER = 'title',
    IMAGE = 'image',
    IMAGE2 = 'image2'
}

export interface NewsBodyBlock {
    blockType: NewsBodyEnum;
    blockOrderNumber: number;
    blockDescription?: string;
    blockTitle?: string;
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

export interface ShareCount {
    vk: number;
    fb: number;
    ok: number;
}
