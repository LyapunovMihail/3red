export const ABOUT_CAREER_COLLECTION_NAME = 'aboutCareer';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface ICareerSnippet {
    _id?: any;
    switchOn: boolean;
    data: ICareerData[];
    created_at: any;
    last_modifyed: any;
}

export interface ICareerData {
    name: string;
    text: string;
    url: string;
    show: boolean;
}
