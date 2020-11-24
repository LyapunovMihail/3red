import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { IObjectPreviewSnippet } from '../../../../../serv-files/serv-modules/jk-objects/preview-api/objects-preview.interfaces';

@Injectable()

export class ObjectPreviewAdminService {

    constructor(
        private http: HttpClient,
    ) { }

    public getSnippetById(objectID): Observable<IObjectPreviewSnippet> {
        return this.http.get<IObjectPreviewSnippet>(`/api/jk-object/preview/id/${objectID}`);
    }
    public getObjectById(objectID): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object/id/${objectID}`);
    }
}
