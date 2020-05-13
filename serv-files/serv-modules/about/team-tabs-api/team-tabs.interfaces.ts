export const ABOUT_TEAM_TABS_COLLECTION_NAME = 'aboutTeamTabs';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IAboutTeamTabsSnippet {
    _id?: any;
    switchOn: boolean;
    team?: IAboutTeamTabs[];
    created_at: any;
    last_modifyed: any;
}

export interface IAboutTeamTabs {
    name: string;
    show: boolean;
}
