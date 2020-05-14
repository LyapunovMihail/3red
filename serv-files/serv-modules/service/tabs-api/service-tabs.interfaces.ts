export const SERVICE_TABS_COLLECTION_NAME = 'ServiceTabs';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IServiceTabsSnippet {
    _id?: any;
    tab: IServiceTabs[];
    created_at: any;
    last_modifyed: any;
}

export interface IServiceTabs {
    name: string;
    show: boolean;
}
