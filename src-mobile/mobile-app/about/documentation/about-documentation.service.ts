import { IDocumentationItem, IDocumentationDescription } from '../../../../serv-files/serv-modules/documentation-api/documentation.interfaces';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AboutDocumentationService {

    constructor (
        private http: HttpClient
    ) { }

    public get getObjects(): Observable<IDocumentationItem[]> {
        return this.http.get<IDocumentationItem[]>('/api/documentation/list');
    }

    public get getHeaderDescription(): Observable<IDocumentationDescription> {
        return this.http.get<IDocumentationDescription>('/api/documentation/header');
    }
}
