import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IDocSnippet } from '../../../../serv-files/serv-modules/about/documentation-api/about-documentation.interfaces';

@Injectable()
export class AboutDocumentationAdminService {

    constructor(private http: HttpClient) { }

    public getSnippet(): Observable<IDocSnippet> {
        return this.http.get<IDocSnippet>(`/api/about/docs`);
    }
}
