export const HOME_PREVIEW_COLLECTION_NAME = 'homePreview';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IHomePreviewSnippet {
    _id?: any;
    title: string;
    text: string;
    showNews: boolean;
}
