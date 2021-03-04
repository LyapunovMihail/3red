import { Observable } from 'rxjs';
import { TagInterface } from '../../../serv-files/serv-modules/seo-api/seo.interfaces';
import { adminHeaders } from '../commons/admin-headers.utilit';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class SeoService {

    constructor(public http: HttpClient) { }

    setTag(): Observable<TagInterface[]> {
        const message = JSON.stringify({type: 'set tag'});
        return this.http.post<TagInterface[]>(`/api/admin/meta_set`, message, adminHeaders());
    }

    deleteTag(id): Observable<TagInterface[]> {
        const message = JSON.stringify({tag_id: id});
        return this.http.post<TagInterface[]>(`/api/admin/meta_delete`, message, adminHeaders());
    }

    getTags(): Observable<TagInterface[]> {
        const message = JSON.stringify({type : 'get tags'});
        return this.http.post<TagInterface[]>(`/api/admin/meta_get`, message, adminHeaders());
    }

    updateTag(options): Observable<TagInterface[]> {
        const message = options.hasOwnProperty('flatsPopularCategory') ?
            JSON.stringify({_id: options._id, url: options.url, title: options.title, h1: options.h1, meta: options.meta, flatsSearchParams: options.flatsSearchParams, flatsPopularCategory: options.flatsPopularCategory}) :
            JSON.stringify({_id: options._id, url: options.url, title: options.title, h1: options.h1, meta: options.meta});

        return this.http.post<TagInterface[]>(`/api/admin/meta_update`, message, adminHeaders());
    }

    pushTag(options): Observable<TagInterface[]> {
        const message = JSON.stringify({_id: options._id});
        return this.http.post<TagInterface[]>(`/api/admin/meta_push`, message, adminHeaders());
    }

    popTag(options): Observable<TagInterface[]> {
        const message = JSON.stringify({_id: options._id});
        return this.http.post<TagInterface[]>(`/api/admin/meta_pop`, message, adminHeaders());
    }

}
