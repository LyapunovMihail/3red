export const DYNAMIC_COLLECTION_NAME = 'dynamic';

export const DYNAMIC_UPLOADS_PATH = 'uploads/dynamic/';

export interface IDynamicObject {
    _id?: any;
    created_at: any;
    last_modifyed: any;
    title: string;
    description: string;
    month: number;
    year: number;
    ready: number;
    images: IDynamicImageSnippet[];
}

export interface IDynamicImageSnippet {
    origin: string;
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
