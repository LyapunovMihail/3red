export const OBJECTS_DYNAMIC_COLLECTION_NAME = 'objectDynamic';

export const OBJECTS_DYNAMIC_UPLOADS_PATH = 'uploads/object-dynamic/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectDynamicSnippet {
    _id?: any;
    objectId: string;
    created_at: any;
    last_modifyed: any;
    month: number;
    year: number;
    objects: IDynamicObject[];
}

export interface IDynamicObject {
    title: string;
    description: string;
    ready: number;
    show: boolean;
    images: IDynamicImage[];
}

export interface IDynamicImage {
    image: string;
    thumbnail: string;
    type: EnumDynamicImageType;
}

export enum EnumDynamicImageType {
    VIDEO = 'VIDEO',
    IMAGE = 'IMAGE'
}

export interface IDynamicObjectCreateParameters {
    title: string;
    month: number;
    year: number;
}
