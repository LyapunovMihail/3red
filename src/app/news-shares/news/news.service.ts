import { adminHeaders } from '../../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewsSnippet } from '../../../../serv-files/serv-modules/news-api/news.interfaces';

@Injectable()

export class NewsService {

    constructor( private http: HttpClient ) { }

    public getSnippet(): Observable<INewsSnippet[]> {
        return this.http.get<INewsSnippet[]>('/api/news/all');
    }

    public getSnippetById(id): Observable<INewsSnippet[]> {
        return this.http.get<INewsSnippet[]>(`/api/news/id/${id}`);
    }

    public deleteSnippet(id): Observable<INewsSnippet[]> {
        const message = JSON.stringify({ id });
        return this.http.post<INewsSnippet[]>('/api/admin/news/delete', message, adminHeaders());
    }
}
