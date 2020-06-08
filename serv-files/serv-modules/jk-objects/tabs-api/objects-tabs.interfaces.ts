export const OBJECTS_TABS_COLLECTION_NAME = 'objectTabs';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectTabsSnippet {
    _id?: any;
    objectId: string;
    gallery?: IObjectGalleryTabs[];
    location?: IObjectLocationTab[];
    dynamic?: IObjectDynamicTabs[];
    decorationType?: string[];
    created_at: any;
    last_modifyed: any;
}

export interface IObjectGalleryTabs {
    name: string;
    show: boolean;
}

export interface IObjectDecorationTab { 
    name: string;
    show: boolean;
    turnOnDecorationTypes?: boolean; // когда жмешь галку добавить на табе декорации
    decorationType?: string;
}

export interface IObjectLocationTab {
    name: LocationTabsEnum;
    coords: string;
    image: string;
    thumbnail: string;
    show: boolean;
}

export interface IObjectDynamicTabs {
    name: string;
    description: string;
    show: boolean;
}

export enum LocationTabsEnum {
    OBJECT = 'Объект',
    SALESOFFICE = 'Офис продаж',
    INFRASTRUCTURE = 'Инфраструктура'
}
