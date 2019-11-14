export const CONTACTS_COLLECTION_NAME = 'contacts';

export interface IMail {
    _id?: any;
    type: string;
    status: boolean;
    name: string;
}

export interface IPhone {
    phone: string;
    _id: 'phone';
    message?: string;
}
