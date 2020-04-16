import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Injectable ()

export class NtPlanService {

    public showSearchPanel = new Subject<boolean>();

    constructor( private http: HttpClient ) { }

    public getHouse(houses, mod): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search/object', { search: {houses, mod} });
    }
}
