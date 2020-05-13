export const ABOUT_DOCUMENTATION_COLLECTION_NAME = 'aboutDocumentation';

export const FILEUPLOADS_UPLOADS_PATH = 'uploads/about-files/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IDocSnippet {
    _id?: any ;
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
