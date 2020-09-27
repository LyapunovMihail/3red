import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IObjectDynamicSnippet } from '../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';

export interface IHeaderLink {
    name: string;
    url: string;
}

@Injectable( )

export class HeaderService {

    public objectId: string;

    constructor(
        private http: HttpClient
    ) { }

    public setJkId(id) {
        this.objectId = id;
    }

    public getDynamicLink(): Observable<{year: number, month: number}> {
        return this.http.get<{year: number, month: number}>(`/jk-object/dynamic/last/link/${this.objectId}`);
    }

    public getDynamicLinkForPhotos(id): Observable<IObjectDynamicSnippet[]>  {
        return this.http.get<IObjectDynamicSnippet[]>(`/api/jk-object/dynamic/id/${id}`);
    }

    public links(): IHeaderLink[] {
        return [
            {
                name: 'О компании',
                url: '/about'
            }, {
                name: 'Объекты',
                url: `/objects/list`
            }, {
                name: 'Квартиры',
                url: `/flats/search`
            }, {
                name: 'Контакты',
                url: '/contacts'
            }, {
                name: 'Новости',
                url: '/news-shares'
            }, {
                name: 'Партнеры',
                url: '/partners'
            }, {
                name: 'Избранное',
                url: '/favorites'
            }
        ];
    }
}
