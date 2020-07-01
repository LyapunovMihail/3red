import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IObjectDynamicSnippet } from '../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IObjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Injectable()

export class DynamicService {

    constructor(
        private http: HttpClient
    ) {}

    public getContentSnippet(id, year, month): Observable<IObjectDynamicSnippet> {
        return this.http.get<IObjectDynamicSnippet>(`/api/jk-object/dynamic/id/${id}/${year}/${month}`);
    }

    public getContentSnippets(id): Observable<IObjectDynamicSnippet[]> {
        return this.http.get<IObjectDynamicSnippet[]>(`/api/jk-object/dynamic/id/${id}`);
    }


    public getTabsSnippetById(objectID): Observable<IObjectTabsSnippet> {
        return this.http.get<IObjectTabsSnippet>(`/api/jk-object/tabs/id/${objectID}/dynamic`);
    }

    public getJk(objectID?): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object/id/${objectID}`);
    }
}
