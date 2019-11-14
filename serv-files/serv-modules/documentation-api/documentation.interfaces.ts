export const DOCUMENTATION_COLLECTION_NAME = 'documentation';

export interface IDocumentationItem {
    _id?: any;
    title: string;
    uploads: IDocumentationUploadItem[];
};

export interface IDocumentationUploadItem {
    name: string;
    originalName: string;
    created_at: any;
}

export interface IDocumentationDescription {
    _id: any;
    description: string;
}
