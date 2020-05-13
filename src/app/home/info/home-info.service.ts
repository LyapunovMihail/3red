import { adminHeaders } from '../../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IHomeInfoSnippet } from '../../../../serv-files/serv-modules/home/info-api/home-info.interfaces';

@Injectable()

export class HomeInfoService {

    constructor(
        private http: HttpClient
    ) { }

    public getSnippet(): Observable<IHomeInfoSnippet> {
        return this.http.get<IHomeInfoSnippet>(`/api/home/info`);
    }

    public setSnippet(form) {
        return this.http.post('/api/admin/home/info/create-update', form , adminHeaders());
    }
}
