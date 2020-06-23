import { adminHeaders } from '../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectProjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/project-api/objects-project.interfaces';

@Injectable()

export class ObjectProjectAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectProjectSnippet> {
        return this.http.get<IObjectProjectSnippet>(`/api/jk-object/project/id/${objectID}`);
    }
}
