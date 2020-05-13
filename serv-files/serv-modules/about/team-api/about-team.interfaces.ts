export const ABOUT_TEAM_COLLECTION_NAME = 'aboutTeam';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export const ABOUT_TEAM_UPLOADS_PATH = 'uploads/about-team/';

export interface ITeamSnippet {
    _id?: any;
    tab: string;
    data: ITeamData[];
    created_at: any;
    last_modifyed: any;
}

export interface ITeamData {
    fio: string;
    position: string;
    image: string;
    thumbnail: string;
}
