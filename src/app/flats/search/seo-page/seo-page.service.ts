import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { adminHeaders } from '../../../commons/admin-headers.utilit';
import { TagInterface } from '../../../../../serv-files/serv-modules/seo-api/seo.interfaces';

@Injectable()

export class SeoPageService {

    constructor(public http: HttpClient) { }

    createTag(tagObject): Observable<TagInterface[]> {
        const body = JSON.stringify({url: tagObject.url, title: tagObject.title, h1: tagObject.h1, meta: tagObject.meta, flatsSearchParams: tagObject.flatsSearchParams, flatsPopularCategory: true});
        return this.http.post<TagInterface[]>(`/api/admin/meta_create`, body, adminHeaders());
    }

    updateTag(tagObject): Observable<TagInterface[]> {
        const body = JSON.stringify({_id: tagObject._id, url: tagObject.url, title: tagObject.title, h1: tagObject.h1, meta: tagObject.meta, flatsSearchParams: tagObject.flatsSearchParams, flatsPopularCategory: true});
        return this.http.post<TagInterface[]>(`/api/admin/meta_update`, body, adminHeaders());
    }
}
