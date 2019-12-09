export const OBJECTS_TABS_COLLECTION_NAME = 'objectTabs';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectTabsSnippet {
    _id?: any;
    objectId: string;
    gallery?: IObjectGalleryTabs;
    decoration?: IObjectDecorationTabs;
}

export interface IObjectGalleryTabs {
    objectId: string;
    name: string;
    show: boolean;
}

export interface IObjectDecorationTabs {
    objectId: string;
    name: string;
    show: boolean;
}
