import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectFlatSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/flat-api/objects-flat.interfaces';
import { IAddressItemFlat } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Injectable()

export class PlanService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectFlatSnippet> {
        return this.http.get<IObjectFlatSnippet>(`/api/jk-object/flat/id/${objectID}`);
    }

    public setSnippetData(data): Observable<IObjectFlatSnippet> {
        return this.http.post<IObjectFlatSnippet>('/api/admin/jk-object/flat/create-update', data , adminHeaders());
    }

    public getFlats(options): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search/object', { search: options });
    }
}
