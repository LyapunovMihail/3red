import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IObjectLocationSnippet } from '../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';

@Injectable()

export class ObjectLocationAdminService {

    constructor(
        private http: HttpClient,
    ) {
    }

    public getContentSnippet(objectID): Observable<IObjectLocationSnippet> {
        return this.http.get<IObjectLocationSnippet>(`/api/jk-object/location/id/${objectID}`);
    }

    public getTabsSnippetById(objectID): Observable<IObjectTabsSnippet> {
        return this.http.get<IObjectTabsSnippet>(`/api/jk-object/tabs/id/${objectID}/location`);
    }
}
