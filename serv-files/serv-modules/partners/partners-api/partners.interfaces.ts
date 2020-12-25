export const PARTNERS_COLLECTION_NAME = 'partners';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export const PARTNERS_UPLOADS_PATH = 'uploads/partners/';

export interface IPartnersSnippet {
    _id?: any;
    created_at: any;
    last_modifyed: any;
    blackPart: string;
    greyPart?: string;
    paragraf: string;
    uk: IPartnersUk[];
}

export interface IPartnersUk {
    tab: string;
    title: string;
    description: string;
    url: string;
    jk: IPartnersJk[];
    icon: string;
}

export interface IPartnersJk {
    name: string;
    id: string;
}
