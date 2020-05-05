import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Injectable()

export class HomeFilterService {

    constructor(private http: HttpClient) { }

    public getFlats(options): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search/object', { search: options });
    }

    public getFlatsData(options): Observable<{modsBtnList, housesBtnList, config}>  {
        return this.http.get<{modsBtnList, housesBtnList, config}>('/api/search/common-data', {params: options});
    }
}
