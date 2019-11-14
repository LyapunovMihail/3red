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

    public writeSessionForFullVersion() {
        return this.http.get('/api/agent/desktop');
    }

    public getDynamicLink() {
        return this.http.get('/api/dynamic/last/link');
    }

    public links(data) {
        let date = new Date();
        let year = (data.year) ? data.year : date.getFullYear();
        let month = (data.month) ? data.month : ( date.getMonth() + 1 );
        return [
            {
                name: 'О ЖК',
                url: '/about'
            }, {
                name: 'Расположение',
                url: `/location/routes`
            }, {
                name: 'Инфраструктура',
                url: `/location/infrastructure`
            }, {
                name: 'Квартиры',
                url: `/flats`
            }, {
                name: 'Отделка',
                url: '/decoration'
            }, {
                name: 'Условия покупки',
                url: '/purchase'
            }, {
                name: 'Новости',
                url: '/news-shares'
            }
        ];
    }
}
