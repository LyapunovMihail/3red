import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { ICareerSnippet } from '../../../../serv-files/serv-modules/about/career-api/about-career.interfaces';
import { adminHeaders } from '../../commons/admin-headers.utilit';

@Injectable()

export class AboutCareerAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getSnippet(): Observable<ICareerSnippet> {
        return this.http.get<ICareerSnippet>(`/api/about/career`);
    }

    public setSnippetData(data): Observable<ICareerSnippet> {
        return this.http.post<ICareerSnippet>('/api/admin/about/career/create-update', data , adminHeaders());
    }
}
