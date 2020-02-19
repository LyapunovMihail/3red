export const OBJECTS_TABS_COLLECTION_NAME = 'objectTabs';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectTabsSnippet {
    _id?: any;
    objectId: string;
    gallery?: IObjectGalleryTabs[];
    decoration?: IObjectDecorationTabs[];
    created_at: any;
    last_modifyed: any;
}

export interface IObjectGalleryTabs {
    name: string;
    show: boolean;
}

export interface IObjectDecorationTabs {
    name: string;
    show: boolean;
}
