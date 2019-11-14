import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { NewsRedactFormUpload } from './news-redact-form.upload';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Uploader } from 'angular2-http-file-upload';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()

export class NewsRedactFormService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    setPercentLoadedImage(val: number) {
        this.subject.next(val);
    }

    getPercentLoadedImage(): Observable<number> {
        return this.subject.asObservable();
    }

    formSubmit(id, form) {
        let message = JSON.stringify({ id, form });
        return this.http.post('/api/admin/news/update', message, adminHeaders());
    }

    imageUpload(e) {
        return new Promise((resolve, reject) => {

            let fileList: FileList = e.target.files;
            let uploadFile: File = fileList[0];

            let myUploadItem = new NewsRedactFormUpload(uploadFile);
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
