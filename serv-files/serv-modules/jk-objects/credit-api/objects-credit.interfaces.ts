export const CREDIT_COLLECTION_NAME = 'credit';

export const CREDIT_UPLOADS_PATH = 'uploads/credit/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface ICreditSnippet {
    _id?: any;
    objectId: string;
    switchOn: boolean;
    name: string;
    percent: number;
    initial: number;
    deadline: number;
    show: boolean;
    created_at: any;
    last_modifyed: any;
}
