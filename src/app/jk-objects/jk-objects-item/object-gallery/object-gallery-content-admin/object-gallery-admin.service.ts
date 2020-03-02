import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { ObjectGalleryAdminUpload } from './object-gallery-admin.upload';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Uploader } from 'angular2-http-file-upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectGallerySnippet } from '../../../../../../serv-files/serv-modules/jk-objects/gallery-api/objects-gallery.interfaces';
import { IObjectTabsSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';

@Injectable()

export class ObjectGalleryAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public getContentSnippetByIdAndTab(objectID, tab?, type?): Observable<IObjectGallerySnippet> {
        return this.http.get<IObjectGallerySnippet>(`/api/jk-object/gallery/id/${objectID}/tab/${tab}`);
    }

    public setContentSnippetData(form) {
        return this.http.post('/api/admin/jk-object/gallery/create-update', form , adminHeaders());
    }

    public getTabsSnippetById(objectID): Observable<IObjectTabsSnippet> {
        console.log('get tab snippet');
        return this.http.get<IObjectTabsSnippet>(`/api/jk-object/tabs/id/${objectID}/gallery`);
    }

    public setTabsSnippetData(form) {
        return this.http.post('/api/admin/jk-object/tabs/gallery/create-update', form , adminHeaders());
    }

    public removeTabSlidesFromGallery(tabs) {
        return this.http.post('/api/admin/jk-object/gallery/update', tabs , adminHeaders());
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

            const myUploadItem = new ObjectGalleryAdminUpload(uploadFile);
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
