import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectCreditSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/credit-api/objects-credit.interfaces';
import { ObjectPreviewAdminUpload } from './object-credit-admin.upload';
import { Uploader } from 'angular2-http-file-upload';

@Injectable()

export class ObjectCreditAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public getSnippetById(objectID): Observable<IObjectCreditSnippet> {
        return this.http.get<IObjectCreditSnippet>(`/api/jk-object/credit/id/${objectID}`);
    }

    public setSnippetData(data): Observable<IObjectCreditSnippet> {
        return this.http.post<IObjectCreditSnippet>('/api/admin/jk-object/credit/create-update', data , adminHeaders());
    }

    public setPercentLoadedImage(val: number) {
        this.subject.next(val);
    }

    public getPercentLoadedImage(): Observable<number> {
        return this.subject.asObservable();
    }

    public imageUpload(e) {
        return new Promise((resolve, reject) => {

            const fileList: FileList = e.target.files;
            const uploadFile: File = fileList[0];

            const myUploadItem = new ObjectPreviewAdminUpload(uploadFile);
            myUploadItem.formData = { FormDataKey: 'Form Data Value' };

            this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                resolve(response);
            };
            this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                reject(response);
            };
            // this.uploaderService.onCompleteUpload = (item, response, status, headers) => {};
            this.uploaderService.onProgressUpload = (item, percentComplete) => {
                this.setPercentLoadedImage(percentComplete);
            };
            this.uploaderService.upload(myUploadItem);
        });
    }
}
