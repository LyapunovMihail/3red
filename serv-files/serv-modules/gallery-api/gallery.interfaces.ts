
export const GALLERY_COLLECTION_NAME = 'gallery';

export const GALLERY_UPLOADS_PATH = 'uploads/gallery/';

export interface IGallerySnippet {
    _id?: any;
    order: number;
    image: string;
    thumbnail: string;
    name: string;
    description: string;
    created_at: any;
    last_modifyed: any;
    type?: EnumGallerySnippet;
}

export enum EnumGallerySnippet {
    PREVIEW = 'PREVIEW',
    PLACES = 'PLACES',
    ARCHITECTURE = 'ARCHITECTURE',
    LANDSCAPING = 'LANDSCAPING',
    PARKING = 'PARKING'
}
