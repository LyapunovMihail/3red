import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { Share } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { INewsSnippet } from '../../../../serv-files/serv-modules/news-api/news.interfaces';

@Injectable()

export class HomeNewsService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getMainShares(): Observable<Share[]> {
        return this.http.get<Share[]>(`api/shares/main`);
    }

    public getMainNews(): Observable<INewsSnippet[]> {
        return this.http.get<INewsSnippet[]>(`api/news/main`);
    }

}
