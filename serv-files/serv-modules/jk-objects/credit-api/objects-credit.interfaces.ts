export const OBJECTS_CREDIT_COLLECTION_NAME = 'objectCredit';

export const OBJECTS_CREDIT_UPLOADS_PATH = 'uploads/object-credit/';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectCreditSnippet {
    _id?: any;
    objectId: string;
    switchOn: boolean;
    banks: IBankSnippet[];
    created_at: any;
    last_modifyed: any;
}

export interface IBankSnippet {
    name: string;
    cssClass: string;
    image: string;
    percent: string;
    initial: string;
    deadline: string;
    show: boolean;
    isNew: boolean;
}
