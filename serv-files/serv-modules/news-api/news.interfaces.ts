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
}

export enum EnumNewsSnippet {
    SHARE = 'SHARE',
    NEW = 'NEW'
}
