import { adminHeaders } from './../../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ICreditSnippet } from '../../../../serv-files/serv-modules/credit-api/credit.interfaces';
import { Observable } from 'rxjs';

@Injectable()

export class PurchaseCreditService {

    constructor( private http: HttpClient ) { }

    public getAllSnippet(): Observable<ICreditSnippet[]> {
        return this.http.get<ICreditSnippet[]>('/api/credit/all');
    }

    public getActiveSnippet(): Observable<ICreditSnippet[]> {
        return this.http.get<ICreditSnippet[]>('/api/credit/active');
    }

    public getActiveSnippetWithParams(params): Observable<ICreditSnippet[]> {
        return this.http.post<ICreditSnippet[]>('/api/credit/active_with_params', {params});
    }

    public setSnippet(banks): Observable<ICreditSnippet[]> {
        const message = JSON.stringify({banks});
        return this.http.post<ICreditSnippet[]>('/api/admin/credit/create', message, adminHeaders());
    }

    public deleteSnippet(id): Observable<ICreditSnippet[]> {
        const message = JSON.stringify({ id });
        return this.http.post<ICreditSnippet[]>('/api/admin/credit/delete', message, adminHeaders());
    }

    public updateSnippet( id, key, value ): Observable<ICreditSnippet[]> {
        const message = JSON.stringify({ id, key, value });
        return this.http.post<ICreditSnippet[]>('/api/admin/credit/update', message, adminHeaders());
    }

    public calculateMonthPay(params, snippets) {
        const leftSum = params.price - params.firstpay;

        snippets.forEach((bank) => {
            const rate = bank.percent / (100 * 12);
            bank.monthPay = (leftSum * rate) / (1 - Math.pow((1 + rate), -(params.deadline * 12))); // Формула для подсчета ежемесячного платежа
            bank.monthPay = Math.round(bank.monthPay);
        });
    }

}
