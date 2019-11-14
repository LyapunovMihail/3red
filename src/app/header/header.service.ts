import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface IHeaderLink {
    name: string;
    url: string;
}

@Injectable( )

export class HeaderService {

    constructor(
        private http: HttpClient
    ) { }

    public getDynamicLink() {
        return this.http.get('/api/dynamic/last/link');
    }

    public links(data): IHeaderLink[] {
        let date = new Date();
        let year = (data.year) ? data.year : date.getFullYear();
        let month = (data.month) ? data.month : ( date.getMonth() + 1 );
        return [
            {
                name: 'О ЖК',
                url: '/about'
            }, {
                name: 'Расположение',
                url: `/location`
            }, {
                name: 'Квартиры',
                url: `/flats`
            }, {
                name: 'Отделка',
                url: '/decoration'
            }, {
                name: 'Ход строительства',
                url: `/dynamic/${year}/${month}`
            }, {
                name: 'Условия покупки',
                url: '/purchase'
            }, {
                name: 'Новости',
                url: '/news-shares'
            } /*, {
                name: 'Избранное',
                url: '/favorites'
            }, */
        ];
    }
}
