import { adminHeaders } from '../../../commons/admin-headers.utilit';
import { AboutTeamAdminUpload } from './about-team-admin.upload';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Uploader } from 'angular2-http-file-upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { IAboutTeamTabsSnippet } from '../../../../../serv-files/serv-modules/about/team-tabs-api/team-tabs.interfaces';
import { ITeamSnippet } from '../../../../../serv-files/serv-modules/about/team-api/about-team.interfaces';

@Injectable()

export class AboutTeamAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public getContentSnippets(): Observable<ITeamSnippet[]> {
        return this.http.get<ITeamSnippet[]>(`/api/about/team`);
    }

    public setContentSnippetData(form) {
        return this.http.post('/api/admin/about/team/create-update', form , adminHeaders());
    }

    public getTabsSnippet(): Observable<IAboutTeamTabsSnippet> {
        return this.http.get<IAboutTeamTabsSnippet>(`/api/about/team/tabs`);
    }

    public setTabsSnippetData(form) {
        return this.http.post('/api/admin/about/team/tabs/create-update', form , adminHeaders());
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

            const myUploadItem = new AboutTeamAdminUpload(uploadFile);
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
