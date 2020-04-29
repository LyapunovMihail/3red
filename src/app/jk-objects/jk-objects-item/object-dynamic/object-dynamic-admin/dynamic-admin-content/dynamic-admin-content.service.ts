import { forwardRef, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { IObjectDynamicSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { IObjectTabsSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { adminHeaders } from '../../../../../commons/admin-headers.utilit';
import { DynamicAdminContentUpload } from './dynamic-admin-content.upload';
import { Uploader } from 'angular2-http-file-upload/uploader/uploader';
import { IObjectSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Injectable()

export class DynamicService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) {}

    public getContentSnippet(id, year, month): Observable<IObjectDynamicSnippet> {
        return this.http.get<IObjectDynamicSnippet>(`/api/jk-object/dynamic/id/${id}/${year}/${month}`);
    }

    public getContentSnippets(id): Observable<IObjectDynamicSnippet[]> {
        return this.http.get<IObjectDynamicSnippet[]>(`/api/jk-object/dynamic/id/${id}`);
    }

    public setContentSnippetData(form): Observable<IObjectDynamicSnippet> {
        return this.http.post<IObjectDynamicSnippet>('/api/admin/jk-object/dynamic/create-update', form , adminHeaders());
    }

    public getTabsSnippetById(objectID): Observable<IObjectTabsSnippet> {
        return this.http.get<IObjectTabsSnippet>(`/api/jk-object/tabs/id/${objectID}/dynamic`);
    }

    public setTabsSnippetData(form) {
        return this.http.post('/api/admin/jk-object/tabs/dynamic/create-update', form , adminHeaders());
    }

    public getJk(objectID?): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object/id/${objectID}`);
    }

    public setPercentLoadedImage(val: number) {
        this.subject.next(val);
    }

    public getPercentLoadedImage(): Observable<number> {
        return this.subject.asObservable();
    }

    public imageUpload(file) {
        return new Promise((resolve, reject) => {

            const uploadFile: File = file;

            const myUploadItem = new DynamicAdminContentUpload(uploadFile);
            myUploadItem.formData = {FormDataKey: 'Form Data Value'};

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
