export const SERVICE_COLLECTION_NAME = 'service';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IServiceSnippet {
    _id?: any;
    created_at: any;
    last_modifyed: any;
    blackPart: string;
    greyPart: string;
    uk: IServiceUk[];
}

export interface IServiceUk {
    tab: string;
    title: string;
    description: string;
    url: string;
    jk: IServiceJk[];

}

export interface IServiceJk {
    name: string;
    id: string;
}
