import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Uploader } from 'angular2-http-file-upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAboutTeamTabsSnippet } from '../../../../serv-files/serv-modules/about/team-tabs-api/team-tabs.interfaces';
import { ITeamSnippet } from '../../../../serv-files/serv-modules/about/team-api/about-team.interfaces';

@Injectable()

export class AboutTeamAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public getContentSnippets(): Observable<ITeamSnippet[]> {
        return this.http.get<ITeamSnippet[]>(`/api/about/team`);
    }

    public getTabsSnippet(): Observable<IAboutTeamTabsSnippet> {
        return this.http.get<IAboutTeamTabsSnippet>(`/api/about/team/tabs`);
    }
}
