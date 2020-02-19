import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NAVANCHORS } from './navAnchors';

export interface IHeaderLink {
    name: string;
    url: string;
}

@Injectable( )

export class HeaderService {

    public navAnchors = NAVANCHORS;

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
                name: 'О компании',
                url: '/about'
            }, {
                name: 'Объекты',
                url: `/objects`
            }, {
                name: 'Квартиры',
                url: `/flats`
            }, {
                name: 'Контакты',
                url: '/contacts'
            }, {
                name: 'Новости',
                url: '/news-shares'
            }, {
                name: '3-Red Сервис',
                url: '/service'
            }, {
                name: 'Избранное',
                url: '/favorites'
            }
        ];
    }

    public getNavAnchors(page): IHeaderLink[] {
        return this.navAnchors[page];
    }
}
