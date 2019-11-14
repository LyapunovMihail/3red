import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Injectable ()

export class PlanService {

    public showSearchPanel = new Subject<boolean>();

    constructor( private http: HttpClient ) { }

    public getHouse(num): Observable<IAddressItemFlat[]> {
        return this.http.get<IAddressItemFlat[]>('/api/search', { params: {houses: num} });
    }

    public setShowSearchPanel(val) {
        this.showSearchPanel.next(val);
    }

    public getShowSearchPanel() {
        return this.showSearchPanel.asObservable();
    }
}
