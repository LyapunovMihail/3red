import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObjectGallerySnippet } from '../../../../../serv-files/serv-modules/jk-objects/gallery-api/objects-gallery.interfaces';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';

@Injectable()

export class ObjectGalleryAdminService {

    constructor(
        private http: HttpClient,
    ) { }

    public getContentSnippetByIdAndTab(objectID, tab?): Observable<IObjectGallerySnippet> {
        return this.http.get<IObjectGallerySnippet>(`/api/jk-object/gallery/id/${objectID}/tab/${tab}`);
    }

    public getTabsSnippetById(objectID): Observable<IObjectTabsSnippet> {
        return this.http.get<IObjectTabsSnippet>(`/api/jk-object/tabs/id/${objectID}/gallery`);
    }
}
