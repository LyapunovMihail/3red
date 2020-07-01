import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IObjectDecorationSnippet } from '../../../../../serv-files/serv-modules/jk-objects/decoration-api/objects-decoration.interfaces';

@Injectable()

export class ObjectDecorationAdminService {

    constructor(private http: HttpClient) {}

    public getContentSnippetByIdAndTab(objectID): Observable<IObjectDecorationSnippet> {
        return this.http.get<IObjectDecorationSnippet>(`/api/jk-object/decoration/id/${objectID}`);
    }

    public getTypesSnippetById(objectID): Observable<IObjectTabsSnippet> {
        return this.http.get<IObjectTabsSnippet>(`/api/jk-object/tabs/id/${objectID}/decoration`);
    }
}
