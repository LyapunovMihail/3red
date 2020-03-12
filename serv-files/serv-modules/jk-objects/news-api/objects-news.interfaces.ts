export const OBJECTS_NEWS_COLLECTION_NAME = 'objectNews';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectNewsSnippet {
    _id?: any;
    objectId: string;
    switchOn: boolean;
}
