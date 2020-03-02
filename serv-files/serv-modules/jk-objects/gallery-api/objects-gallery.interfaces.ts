export const OBJECTS_GALLERY_COLLECTION_NAME = 'objectGallery';

export const OBJECTS_GALLERY_UPLOADS_PATH = 'uploads/object-gallery/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectGallerySnippet {
    _id?: any;
    objectId: string;
    switchOn: boolean;
    image_data: IImageData[];
    created_at: any;
    last_modifyed: any;
}

export interface IImageData {
    image: string;
    thumbnail: string;
    tab: string;
    title: string;
    description: string;
}
