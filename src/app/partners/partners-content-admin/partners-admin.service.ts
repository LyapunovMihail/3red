import { adminHeaders } from '../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IPartnersSnippet } from '../../../../serv-files/serv-modules/partners/partners-api/partners.interfaces';
import { IAboutTeamTabsSnippet } from '../../../../serv-files/serv-modules/about/team-tabs-api/team-tabs.interfaces';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { Uploader } from 'angular2-http-file-upload/uploader/uploader';
import { PartnersAdminUpload } from './partners-admin.upload';

@Injectable()

export class PartnersAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public getJkSnippets(objectID?): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object/id/${objectID}`);
    }

    public getContentSnippetByTab(tab?): Observable<IPartnersSnippet> {
        return this.http.get<IPartnersSnippet>(`/api/partners/tab/${tab}`);
    }

    public setContentSnippetData(data): Observable<IPartnersSnippet> {
        return this.http.post<IPartnersSnippet>('/api/admin/partners/create-update', data , adminHeaders());
    }

    public getTabsSnippet(): Observable<IAboutTeamTabsSnippet> {
        return this.http.get<IAboutTeamTabsSnippet>(`/api/partners/tabs`);
    }

    public setTabsSnippetData(form) {
        return this.http.post('/api/admin/partners/tabs/create-update', form , adminHeaders());
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

            const myUploadItem = new PartnersAdminUpload(uploadFile);
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
