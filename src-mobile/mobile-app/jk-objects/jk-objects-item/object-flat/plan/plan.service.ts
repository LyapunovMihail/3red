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

    public parseText(num, arr?) {

        num = Math.abs(num) % 100;
        const words = arr ? arr : ['квартира', 'квартиры', 'квартир'];
        const sum = num % 10;

        if (num > 10 && num < 20) { return words[2]; }
        if (sum > 1 && sum < 5) { return words[1]; }
        if (sum === 1) { return words[0]; }
        return words[2];
    }
}
