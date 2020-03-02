import { IObjectDecorationTab } from '../tabs-api/objects-tabs.interfaces';

export const OBJECTS_DECORATION_COLLECTION_NAME = 'objectDecoration';

export const OBJECTS_DECORATION_UPLOADS_PATH = 'uploads/object-decoration/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectDecorationSnippet {
    _id?: any;
    objectId: string;
    switchOn: boolean;
    data: IDecorationData[];
    created_at: any;
    last_modifyed: any;
}

export interface IDecorationData {
    images: IDecorationImage[];
    info: IDecorationInfo[];
    tab: IObjectDecorationTab;
}

export interface IDecorationImage {
    image: string;
    thumbnail: string;
}

export interface IDecorationInfo {
    name: string;
    mod: string;
}

export interface IObjectDecorationTab {
    name: string;
    show: boolean;
    turnOnDecorationTypes?: boolean; // когда жмешь галку добавить на табе декорации
    decorationType?: string;
}
