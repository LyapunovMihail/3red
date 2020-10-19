export const PARTNERS_TABS_COLLECTION_NAME = 'PartnersTabs';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IPartnersTabsSnippet {
    _id?: any;
    tab: IPartnersTabs[];
    created_at: any;
    last_modifyed: any;
}

export interface IPartnersTabs {
    name: string;
    show: boolean;
}
