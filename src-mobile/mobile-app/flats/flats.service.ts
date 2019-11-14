import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFlatResponse } from '../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { Observable } from 'rxjs';

@Injectable()

export class FlatsService {

    constructor( private http: HttpClient ) {}

    public getObjects(options): Observable<IFlatResponse> {
        return this.http.post<IFlatResponse>('/api/search/with_count', { search: options });
    }

}
