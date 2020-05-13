import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectMembersSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/members-api/objects-members.interfaces';

@Injectable()

export class ObjectMembersAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectMembersSnippet> {
        return this.http.get<IObjectMembersSnippet>(`/api/jk-object/members/id/${objectID}`);
    }

    public setSnippetData(data): Observable<IObjectMembersSnippet> {
        return this.http.post<IObjectMembersSnippet>('/api/admin/jk-object/members/create-update', data , adminHeaders());
    }
}
