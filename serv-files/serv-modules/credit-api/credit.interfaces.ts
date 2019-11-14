export const CREDIT_COLLECTION_NAME = 'credit';

export const CREDIT_UPLOADS_PATH = 'uploads/credit/';

export interface ICreditSnippet {
    _id?: any;
    name: string;
    image: string;
    cssclass: string;
    percent: number;
    initial: number;
    deadline: number;
    // military: boolean;
    // maternal: boolean;
    // nationality: boolean;
    active: boolean;
    created_at: string;
}
