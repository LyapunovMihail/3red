import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()

export class FormsRequestService {

    constructor( private http: HttpClient ) { }

    public sendCallForm(form) {
        const message = JSON.stringify(form);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post('/api/request_form/call', message, { headers } );
    }

    public sendCreditForm(form) {
        const message = JSON.stringify(form);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post('/api/request_form/credit', message, { headers } );
    }

    public sendReserveForm(form) {
        const message = JSON.stringify(form);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post('/api/request_form/reserve', message, { headers } );
    }

}
