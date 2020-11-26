import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddressItemFlat } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { IObjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Injectable()

export class HouseService {

    constructor(private http: HttpClient) { }

    public getFlats(options): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search/object', { search: options });
    }

    public getFlatsDataByObjectId(id): Observable<{jk: IObjectSnippet, housesBtnList, floorCount, chess, config}> {
        return this.http.get<{jk: IObjectSnippet, housesBtnList, floorCount, chess, config}>(`/api/search/object-data/${id}`);
    }

    public getConfig(options): Observable<{config}> {
        console.log('options: ', options);
        return this.http.get<{config}>(`/api/search/config`, {params: options});
    }
}
