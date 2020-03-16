import { Share } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Uploader } from 'angular2-http-file-upload';
import { SharesImageUpload } from './shares-edit/shares-edit.upload';
import { adminHeaders } from '../../commons/admin-headers.utilit';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SharesService {

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader))
        private uploaderService: Uploader
    ) {}

    public getShares(): Observable<Share[]> {
        return this.http.get<Share[]>(`/api/shares/list`);
    }

    public getShareById(id): Observable<Share[]> {
        return this.http.get<Share[]>(`/api/shares/id/${id}`);
    }

    public createShare(obj) {
        const message = JSON.stringify(obj);
        return this.http.post('/api/admin/shares/create', message, adminHeaders());
    }

    public updateShare(id, obj: Share) {
        return this.http.post(`/api/admin/shares/update`, {id, obj}, adminHeaders());
    }

    public updateShareCount(id, form, item) {
        console.log('form: ', form);
        let message = JSON.stringify({ id, form, item });
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
        });
        return this.http.post('/api/shares/update/shareCount', message, {headers});
    }

    public deleteShare(id) {
        return this.http.post('/api/admin/shares/delete', {id}, adminHeaders());
    }

    public getFlatsBySectionNum(num) {
        return this.http.get(`/api/search?sections=${num}`);
    }

    public imageUpload(file) {

        return new Promise((resolve, reject) => {

            const myUploadItem = new SharesImageUpload(file);
            myUploadItem.formData = { FormDataKey: 'Form Data Value' };

            this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                resolve(response);
            };

            this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                reject(response);
            };

            this.uploaderService.upload(myUploadItem);
        });
    }
}
