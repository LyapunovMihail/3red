import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObjectCreditSnippet } from '../../../../../serv-files/serv-modules/jk-objects/credit-api/objects-credit.interfaces';

@Injectable()

export class ObjectCreditAdminService {

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectCreditSnippet> {
        return this.http.get<IObjectCreditSnippet>(`/api/jk-object/credit/id/${objectID}`);
    }
}
