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
        form = this.parseFormForCRM(form, 'credit');
        const message = JSON.stringify(form);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post('/api/request_form/credit', message, { headers } );
    }

    public sendReserveForm(form) {
        form = this.parseFormForCRM(form, 'reserve');
        const message = JSON.stringify(form);
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post('/api/request_form/reserve', message, { headers } );
    }

    private parseFormForCRM(form, type) {
        const payTime = form.wait_for_call === 'now' ? 'ожидает сейчас' : form.time;
        let descr;
        if (type === 'credit') {
            descr = `
                --- Удобное время для связи ---: ${payTime}
                --- Первоначальный взнос по ипотеке ---: ${form.first_pay}
                --- Планируемый срок выплат ---: ${form.period_pay}
            `;
        } else if (type === 'reserve') {
            descr = `
                --- Удобное время для связи ---: ${payTime}
            `;
        }

        return {
            ArticleId: form.article,
            Description: descr,
            Email: form.mail,
            FirstName: form.name,
            LastName: form.lastName,
            MiddleName: form.middleName,
            Phone: form.phone,
            WebSiteUrl: 'mkvdom.ru'
        };
    }
}
