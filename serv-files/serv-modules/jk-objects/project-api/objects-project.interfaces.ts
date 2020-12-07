export const OBJECTS_PROJECT_COLLECTION_NAME = 'objectProject';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectProjectSnippet {
    _id?: any;
    objectId: string;
    switchOn: boolean;
    link?: IObjectProjectLink;
    socials?: IObjectProjectSocialsUrls;
    description?: string;
    indicators?: IObjectProjectIndicator[];
    createdIndicators?: IObjectProjectCreatedIndicator[];
    created_at: any;
    last_modifyed: any;
}

export interface IObjectProjectLink {
    name: string;
    url: string;
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
export interface IObjectProjectCreatedIndicator {
    name: string;
    value: string;
}
