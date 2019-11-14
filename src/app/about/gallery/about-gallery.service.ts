import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { adminHeaders } from '../../commons/admin-headers.utilit';
import { EnumGallerySnippet, IGallerySnippet } from '../../../../serv-files/serv-modules/gallery-api/gallery.interfaces';

@Injectable()

export class AboutGalleryService {

    constructor( private http: HttpClient ) { }

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
