import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { NewsCreateRedactFormUpload } from './news-create-redact-form.upload';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Uploader } from 'angular2-http-file-upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Injectable()

export class NewsCreateRedactFormService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public setPercentLoadedImage(val: number) {
        this.subject.next(val);
    }

    public getPercentLoadedImage(): Observable<number> {
        return this.subject.asObservable();
    }

    public createSnippet(form) {
        const message = JSON.stringify({ form });
        return this.http.post('/api/admin/news/create', message, adminHeaders());
    }

    public updateSnippet(id, form) {
        let message = JSON.stringify({ id, form });
        return this.http.post('/api/admin/news/update', message, adminHeaders());
    }

    public getSnippets(objectID?): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object/id/${objectID}`);
    }

    public imageUpload(e) {
        return new Promise((resolve, reject) => {

            const fileList: FileList = e.target.files;
            const uploadFile: File = fileList[0];
            const myUploadItem = new NewsCreateRedactFormUpload(uploadFile);
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
