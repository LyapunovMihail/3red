import { adminHeaders } from '../../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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

    public updateSnippet(id, form) {
        let message = JSON.stringify({ id, form });
        return this.http.post('/api/admin/news/update', message, adminHeaders());
    }

    public updateShareCount(id, form, item) {
        let message = JSON.stringify({ id, form, item });
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post('/api/news/update/shareCount', message, {headers});
    }

    public deleteSnippet(id): Observable<INewsSnippet[]> {
        const message = JSON.stringify({ id });
        return this.http.post<INewsSnippet[]>('/api/admin/news/delete', message, adminHeaders());
    }

    public getCount(id): Observable<any> {
        return this.http.get<any>(`https://vk.com/share.php?act=count&index=${id}&url=${window.location.href}`);
    }
}
