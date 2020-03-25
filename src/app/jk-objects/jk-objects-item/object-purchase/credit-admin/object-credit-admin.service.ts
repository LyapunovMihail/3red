import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectCreditSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/credit-api/objects-credit.interfaces';

@Injectable()

export class ObjectCreditAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectCreditSnippet> {
        return this.http.get<IObjectCreditSnippet>(`/api/jk-object/credit/id/${objectID}`);
    }

    public setSnippetData(data): Observable<IObjectCreditSnippet> {
        return this.http.post<IObjectCreditSnippet>('/api/admin/jk-object/credit/create-update', data , adminHeaders());
    }
}
