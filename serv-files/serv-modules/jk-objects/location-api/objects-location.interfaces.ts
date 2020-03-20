import { IObjectLocationTab } from '../tabs-api/objects-tabs.interfaces';

export const OBJECTS_LOCATION_COLLECTION_NAME = 'objectLocation';

export const OBJECTS_LOCATION_UPLOADS_PATH = 'uploads/object-location/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectLocationSnippet {
    _id?: any;
    objectId: string;
    switchOn: boolean;
    data: ILocationData[];
    created_at: any;
    last_modifyed: any;
}

export interface ILocationData {
    routesMarks?: IRoutesMarks[];
    infraMarks?: IInfraMarks[];
    tab: IObjectLocationTab;
}

export interface IRoutesMarks {
    type: string;
    size: number[];
    offset: number[];
    zIndex: number;
    content: string;
    route: IRouteParams;
    coords: string;
    place: string;
    info: string;
    name?: string;

}
export interface IRouteParams {
    origin: string;
    color: string;
    activeColor: string;
    strokeStyle: string;
}

export interface IInfraMarks {
    type: string;
    coords: string;
    name: string;
}
