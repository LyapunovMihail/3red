import { IDynamicObjectCreateParameters } from '../../../../serv-files/serv-modules/dynamic-api/dynamic.interfaces';
import { adminHeaders } from './../../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class DynamicAdminCreateService {
    constructor( private http: HttpClient ) {}

    public createObject(options: IDynamicObjectCreateParameters ): Observable<any> {
        const message = JSON.stringify(options);
        return this.http.post('/api/admin/dynamic/set', message, adminHeaders());
    }

}
