
export const OBJECTS_PREVIEW_COLLECTION_NAME = 'objectPreview';

export const OBJECTS_PREVIEW_UPLOADS_PATH = 'uploads/object-preview/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectPreviewSnippet {
    _id?: any;
    objectId: string;
    mainInfo: IObjectPreviewMainInfo;
    deadlines?: IObjectPreviewDeadline[];
    indicators?: IObjectPreviewIndicator[];
    createdIndicators?: IObjectPreviewCreatedIndicator[];
    created_at: any;
    last_modifyed: any;
}

export interface IObjectPreviewMainInfo {
    title: string;
    address: string;
    webcamLink: string;
    image: string;
    thumbnail: string;
}
export interface IObjectPreviewDeadline {
    corpusId: string;
    deadline: string;
    realized: boolean;
}
// export interface IObjectPreviewIndicator {
//     flatPrice: string;
//     totalSpaceObject: string;
//     totalConstructSize: string;
//     nonResidentialFlatsSpace: string;
//     flatsSpace: string;
//     floorsQuantity: string;
//     flatsQuantity: string;
//     apartmentsQuantity: string;
//     schoolPlacesQuantity: string;
//     KindergartenPlaceQuantity: string;
//     parkingQuantity: string;
//     constructionTime: string;
// }

export interface IObjectPreviewIndicator {
    value: string;
    text: string;
}
export interface IObjectPreviewCreatedIndicator {
    name: string;
    value: string;
}
