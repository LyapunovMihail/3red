import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { ObjectLocationAdminUpload } from './object-location-admin.upload';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Uploader } from 'angular2-http-file-upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectTabsSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IObjectLocationSnippet, IRoutesMarks } from '../../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';

@Injectable()

export class ObjectLocationAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) {
    }

    public getContentSnippet(objectID): Observable<IObjectLocationSnippet> {
        return this.http.get<IObjectLocationSnippet>(`/api/jk-object/location/id/${objectID}`);
    }

    public setContentSnippetData(form): Observable<IObjectLocationSnippet> {
        return this.http.post<IObjectLocationSnippet>('/api/admin/jk-object/location/create-update', form, adminHeaders());
    }

    public getTabsSnippetById(objectID): Observable<IObjectTabsSnippet> {
        return this.http.get<IObjectTabsSnippet>(`/api/jk-object/tabs/id/${objectID}/location`);
    }

    public setTabsSnippetData(form) {
        return this.http.post('/api/admin/jk-object/tabs/location/create-update', form, adminHeaders());
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

            const myUploadItem = new ObjectLocationAdminUpload(uploadFile);
            myUploadItem.formData = {FormDataKey: 'Form Data Value'};

            this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                resolve(response);
            };
            this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                reject(response);
            };
            this.uploaderService.onCompleteUpload = (item, response, status, headers) => {};
            this.uploaderService.onProgressUpload = (item, percentComplete) => {
            };
            this.uploaderService.upload(myUploadItem);
        });
    }

    public parseFormValue(marks: IRoutesMarks[]) {
        marks.forEach((mark) => {
            if (mark.type === 'auto') {
                mark.route = {
                    origin: mark.coords, // Начало линии откуда простраивается путь
                    color: 'rgba(90,49,197,.6)',
                    activeColor: 'rgb(90,49,197)',
                    strokeStyle: '1 0'
                };
                mark.offset = [0, -20];
            }
            if (mark.type === 'metro') {
                mark.route = {
                    origin: mark.coords, // Начало линии откуда простраивается путь
                    color: 'rgba(255,0,19,.6)',
                    activeColor: 'rgb(255,0,19)',
                    strokeStyle: '1 0'
                };
                mark.offset = [0, -16];
            }
        });

    }
}
