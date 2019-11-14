import { adminHeaders } from './../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()

export class AuthorizationService {

    constructor( private http: HttpClient ) { }

    public login( form ): Observable<any> {
        const message = JSON.stringify(form);
        const headers = new HttpHeaders({'Content-Type': 'application/json'});
        return this.http.post('/api/authorization', message, {headers});

    }

    public reviuseToken(token): Observable<any> {
        const message = JSON.stringify({ token });
        return this.http.post('/api/reviusetoken', message, adminHeaders());
    }

}
