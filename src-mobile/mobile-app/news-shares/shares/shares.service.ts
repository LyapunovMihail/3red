import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Share } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';

@Injectable()
export class SharesService {

    constructor(
        private http: HttpClient
    ) {}

    public getShares(limit: number, skip: number): Observable<{length: number, sharesList: Share[]}> {
        return this.http.get<{length: number, sharesList: Share[]}>(`/api/shares/list?limit=${limit}&skip=${skip}`);
    }

    public getShareById(id): Observable<Share[]> {
        return this.http.get<Share[]>(`/api/shares/id/${id}`);
    }
}
