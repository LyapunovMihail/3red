import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObjectFlatSnippet } from '../../../../../serv-files/serv-modules/jk-objects/flat-api/objects-flat.interfaces';
import { Share } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { INewsSnippet } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';

@Injectable()

export class ObjectNewsService {

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectFlatSnippet> {
        return this.http.get<IObjectFlatSnippet>(`/api/jk-object/news/id/${objectID}`);
    }

    public getObjectShares(objectId): Observable<Share[]> {
        return this.http.get<Share[]>(`api/shares/object/${objectId}`);
    }

    public getObjectSnippet(objectId): Observable<INewsSnippet[]> {
        return this.http.get<INewsSnippet[]>(`api/news/object/${objectId}`);
    }
}
