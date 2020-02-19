export const DOCUMENTATION_COLLECTION_NAME = 'documentation';

export const FILEUPLOADS_UPLOADS_PATH = 'uploads/object-files/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectDocSnippet {
    _id?: any ;
    objectId: string;
    switchOn: boolean;
    created_at: string ;
    last_modifyed: string;
    block: IDocBlock[];
}

export interface IDocBlock {
    blockTitle: string;
    uploads: IDocUploadItem[];
}

export interface IDocUploadItem {
    name: string;
    originalName: string;
    date: string;
}
