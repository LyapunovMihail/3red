import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreditSnippet } from '../../../../serv-files/serv-modules/credit-api/credit.interfaces';
import { Observable } from 'rxjs';

@Injectable()

export class PurchaseCreditService {

    constructor( private http: HttpClient ) { }

    public getSnippet(): Observable<ICreditSnippet[]> {
        return this.http.get<ICreditSnippet[]>('/api/credit/active');
    }
}
