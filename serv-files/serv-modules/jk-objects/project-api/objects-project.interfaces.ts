export const OBJECTS_PROJECT_COLLECTION_NAME = 'objectProject';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectProjectSnippet {
    _id?: any;
    objectId: string;
    switchOn: boolean;
    socials?: IObjectProjectSocialsUrls;
    description?: string;
    indicators?: IObjectProjectIndicator[];
    created_at: any;
    last_modifyed: any;
}

export interface IObjectProjectSocialsUrls {
    vk: string;
    inst: string;
    fb: string;
}

export interface IObjectProjectIndicator {
    value: string;
    text: string;
}
