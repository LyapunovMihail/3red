import { adminHeaders } from '../../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHomePreviewSnippet } from '../../../../serv-files/serv-modules/home/preview-api/home-preview.interfaces';

@Injectable()

export class HomePreviewService {

    constructor(
        private http: HttpClient
    ) { }

    public getSnippet(): Observable<IHomePreviewSnippet> {
        return this.http.get<IHomePreviewSnippet>(`/api/home/preview`);
    }

    public setSnippet(form) {
        return this.http.post('/api/admin/home/preview/create-update', form , adminHeaders());
    }
}
