export const AUTHORIZATION_COLLECTION_NAME = 'user';
export const USER_ID = 'ADMIN';

export interface IUser {
    _id: string;
    login: string;
    password: string;
}
