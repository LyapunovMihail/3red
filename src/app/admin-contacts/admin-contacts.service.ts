import { adminHeaders } from './../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AdminContactsService {

    constructor ( private http: HttpClient ) { }

    getPhone() {
        return this.http.get('/api/contacts/phone');
    }

    updatePhone(phone) {
        const message = JSON.stringify({phone});
        return this.http.post('/api/admin/contacts/phone', message, adminHeaders() );
    }

    getMail() {
        return this.http.get(`/api/contacts/mail/get`);
    }

    setMail() {
        const message = JSON.stringify({type: 'set_mail'});
        return this.http.post(`/api/admin/contacts/mail/set`, message, adminHeaders() );
    }

    deleteMail(id) {
        const message = JSON.stringify({mail_id: id});
        return this.http.post(`/api/admin/contacts/mail/delete`, message, adminHeaders() );
    }

    updateMail(id, val, status) {
        const message = JSON.stringify({mail_value: val, mail_id: id, mail_status: status});
        return this.http.post(`/api/admin/contacts/mail/update`, message, adminHeaders() );
    }

}
