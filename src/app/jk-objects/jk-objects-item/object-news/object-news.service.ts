import { adminHeaders } from '../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectFlatSnippet } from '../../../../../serv-files/serv-modules/jk-objects/flat-api/objects-flat.interfaces';
import { Share } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { INewsSnippet } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';

@Injectable()

export class ObjectNewsService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectFlatSnippet> {
        return this.http.get<IObjectFlatSnippet>(`/api/jk-object/news/id/${objectID}`);
    }

    public setSnippetData(data): Observable<IObjectFlatSnippet> {
        return this.http.post<IObjectFlatSnippet>('/api/admin/jk-object/news/create-update', data , adminHeaders());
    }

    public getObjectShares(objectId): Observable<Share[]> {
        return this.http.get<Share[]>(`api/shares/object/${objectId}`);
    }

    public getObjectSnippet(objectId): Observable<INewsSnippet[]> {
        return this.http.get<INewsSnippet[]>(`api/news/object/${objectId}`);
    }

    public updateNewsSnippet(id, form) {
        let message = JSON.stringify({ id, form });
        return this.http.post('/api/admin/news/update', message, adminHeaders());
    }

    public updateShareSnippet(id, obj: Share) {
        return this.http.post(`/api/admin/shares/update`, {id, obj}, adminHeaders());
    }
}
