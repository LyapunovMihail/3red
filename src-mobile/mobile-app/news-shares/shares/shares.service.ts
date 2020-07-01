import { Share } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SharesService {

    constructor(private http: HttpClient) {}

    public getShares(): Observable<Share[]> {
        return this.http.get<Share[]>(`/api/shares/list`);
    }

    public getShareById(id): Observable<Share[]> {
        return this.http.get<Share[]>(`/api/shares/id/${id}`);
    }

    public updateShareCount(id, form, item) {
        let message = JSON.stringify({ id, form, item });
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post('/api/shares/update/shareCount', message, {headers});
    }
}
