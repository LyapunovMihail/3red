
export const OBJECTS_MEMBERS_COLLECTION_NAME = 'objectMembers';

export const ErrorNotCorrectArguments = 'Параметры переданы не корректно.';

export interface IObjectMembersSnippet {
    _id?: any;
    objectId: string;
    switchOn: boolean;
    data: IMembersData[];
    created_at: any;
    last_modifyed: any;
}

export interface IMembersData {
    name: string;
    members: IMembersAnchor[];
}

export interface IMembersAnchor {
    name: string;
    url: string;
}
