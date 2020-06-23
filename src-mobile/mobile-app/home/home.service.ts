import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewsSnippet } from '../../../serv-files/serv-modules/news-api/news.interfaces';
import { Share } from '../../../serv-files/serv-modules/shares-api/shares.interfaces';

@Injectable()

export class HomeService {

    constructor( private http: HttpClient ) { }

    public getMainNews(): Observable<INewsSnippet[]> {
        return this.http.get<INewsSnippet[]>('/api/news/main');
    }

    public getMainShares(): Observable<Share[]> {
        return this.http.get<Share[]>(`/api/shares/main`);
    }

}
