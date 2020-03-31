export const OBJECTS_OBJECT_COLLECTION_NAME = 'object';

export const OBJECTS_UPLOADS_PATH = 'uploads/object/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectSnippet {
    _id?: any;
    objectId: string;
    name: string;
    subtext: string;
    address: string;
    coords: string;
    show_on_main: boolean;
    publish: boolean;
    status: string;
    image: string;
    thumbnail: string;
    created_at: any;
    last_modifyed: any;
}
