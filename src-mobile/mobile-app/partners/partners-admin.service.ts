import { adminHeaders } from '../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPartnersSnippet } from '../../../serv-files/serv-modules/partners/partners-api/partners.interfaces';
import { IAboutTeamTabsSnippet } from '../../../serv-files/serv-modules/about/team-tabs-api/team-tabs.interfaces';
import { IObjectSnippet } from '../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Injectable()

export class PartnersAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getJkSnippets(objectID?): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object/id/${objectID}`);
    }

    public getContentSnippetByTab(tab?): Observable<IPartnersSnippet> {
        return this.http.get<IPartnersSnippet>(`/api/partners/tab/${tab}`);
    }

    public setContentSnippetData(data): Observable<IPartnersSnippet> {
        return this.http.post<IPartnersSnippet>('/api/admin/partners/create-update', data , adminHeaders());
    }

    public getTabsSnippet(): Observable<IAboutTeamTabsSnippet> {
        return this.http.get<IAboutTeamTabsSnippet>(`/api/partners/tabs`);
    }

    public setTabsSnippetData(form) {
        return this.http.post('/api/admin/partners/tabs/create-update', form , adminHeaders());
    }
}
