import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObjectMembersSnippet } from '../../../../../serv-files/serv-modules/jk-objects/members-api/objects-members.interfaces';

@Injectable()

export class ObjectMembersAdminService {

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectMembersSnippet> {
        return this.http.get<IObjectMembersSnippet>(`/api/jk-object/members/id/${objectID}`);
    }
}
