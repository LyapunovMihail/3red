import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IObjectDocSnippet } from '../../../../../serv-files/serv-modules/jk-objects/documentation-api/objects-documentation.interfaces';

@Injectable()
export class ObjectDocumentationAdminService {

    constructor(
        private http: HttpClient,
    ) { }

    public getSnippetById(objectID): Observable<IObjectDocSnippet> {
        return this.http.get<IObjectDocSnippet>(`/api/jk-object/docs/id/${objectID}`);
    }
}
