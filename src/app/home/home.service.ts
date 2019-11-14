import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { INewsSnippet } from '../../../serv-files/serv-modules/news-api/news.interfaces';
import { Share } from '../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { adminHeaders } from '../commons/admin-headers.utilit';
import { IGallerySnippet } from '../../../serv-files/serv-modules/gallery-api/gallery.interfaces';

@Injectable()

export class HomeService {

    constructor( private http: HttpClient ) { }

    public getNews(): Observable<INewsSnippet[]> {
        return this.http.get<INewsSnippet[]>('/api/news/all');
    }

    public getShares(): Observable<{length: number, sharesList: Share[]}> {
        return this.http.get<{length: number, sharesList: Share[]}>(`/api/shares/list?limit=1000&skip=0`);
    }

    public getGallerySnippet(type): Observable<IGallerySnippet[]> {
        return this.http.get<IGallerySnippet[]>('/api/gallery', {params: {type}});
    }

    public changeDescription(id,  description) {
        let message = JSON.stringify({ id, description });
        return this.http.post('/api/admin/gallery/update/description', message, adminHeaders());
    }
    public changeName(id, name) {
        let message = JSON.stringify({ id, name });
        return this.http.post('/api/admin/gallery/update/name', message, adminHeaders());
    }

}
