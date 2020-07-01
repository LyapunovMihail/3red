import { adminHeaders } from '../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IServiceSnippet } from '../../../serv-files/serv-modules/service/service-api/service.interfaces';
import { IAboutTeamTabsSnippet } from '../../../serv-files/serv-modules/about/team-tabs-api/team-tabs.interfaces';
import { IObjectSnippet } from '../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Injectable()

export class ServiceAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getJkSnippets(objectID?): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object/id/${objectID}`);
    }

    public getContentSnippetByTab(tab?): Observable<IServiceSnippet> {
        return this.http.get<IServiceSnippet>(`/api/service/tab/${tab}`);
    }

    public setContentSnippetData(data): Observable<IServiceSnippet> {
        return this.http.post<IServiceSnippet>('/api/admin/service/create-update', data , adminHeaders());
    }

    public getTabsSnippet(): Observable<IAboutTeamTabsSnippet> {
        return this.http.get<IAboutTeamTabsSnippet>(`/api/service/tabs`);
    }

    public setTabsSnippetData(form) {
        return this.http.post('/api/admin/service/tabs/create-update', form , adminHeaders());
    }
}
