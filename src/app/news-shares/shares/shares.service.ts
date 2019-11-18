import { Share } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Uploader } from 'angular2-http-file-upload';
import { SharesImageUpload } from './shares-edit/shares-edit.upload';
import { adminHeaders } from '../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SharesService {

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader))
        private uploaderService: Uploader
    ) {}

    public getShares(limit: number, skip: number): Observable<{length: number, sharesList: Share[]}> {
        return this.http.get<{length: number, sharesList: Share[]}>(`/api/shares/list?limit=${limit}&skip=${skip}`);
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
