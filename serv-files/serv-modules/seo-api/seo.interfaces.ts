export const SEO_COLLECTION_NAME = 'metatags';

export interface TagInterface {
    _id?: any;
    url: string;
    title: string;
    h1: string;
    meta: Meta[];
    flatsSearchParams?: IFlatsSearchParams;
    flatsPopularCategory?: boolean;
}

export interface Meta {
    name: string;
    content: string;
}

export interface IFlatsSearchParams {
    spaceMin: string;
    spaceMax: string;
    priceMin: string;
    priceMax: string;
    floorMin: string;
    floorMax: string;
    sort?: string;
    decoration?: string;
    rooms?: string;
    sections?: string;
    type?: string;
    status?: string;
    housesMods?: string;
    mod?: string;
    isEuro?: string;
}
