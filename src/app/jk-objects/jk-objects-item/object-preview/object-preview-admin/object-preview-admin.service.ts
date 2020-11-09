import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { ObjectPreviewAdminUpload } from './object-preview-admin.upload';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Uploader } from 'angular2-http-file-upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectPreviewSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/preview-api/objects-preview.interfaces';
import { IObjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Injectable()

export class ObjectPreviewAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public getSnippetById(objectID): Observable<IObjectPreviewSnippet> {
        return this.http.get<IObjectPreviewSnippet>(`/api/jk-object/preview/id/${objectID}`);
    }
    public getObjectById(objectID): Observable<IObjectSnippet> {
        return this.http.get<IObjectSnippet>(`/api/jk-object/object/id/${objectID}`);
    }

    public formSubmit(form) {
        return this.http.post('/api/admin/jk-object/preview/create-update', form , adminHeaders());
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

    public convertIndicatorsValues(form) { // перестраиваем индикаторы в более удобную структуру для хранения в бд
        form.value.indicators = form.value.indicators.map((item) => {
            const key = Object.keys(item)[0];
            const val = item[key];
            return {text: key, value: val};
        }).filter((item) => item.value !== '');
    }
}
