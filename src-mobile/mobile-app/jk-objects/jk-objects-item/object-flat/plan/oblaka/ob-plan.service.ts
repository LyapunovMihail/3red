import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PLAN_SVG } from './ob-plan-svg';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Injectable ()

export class ObPlanService {

    constructor( private http: HttpClient ) { }

    links(): string[] {
        return PLAN_SVG.map((item) => item.houseNumber);
    }

    public getHouseOne(mod): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search/object', { search: {houses: '1', mod} });
    }

    public getHouseTwo(mod): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search/object', { search: {houses: '2', mod} });
    }
}
