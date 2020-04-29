import { HttpClient } from '@angular/common/http';
import { forwardRef, Inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { adminHeaders } from '../../commons/admin-headers.utilit';
import { Uploader } from 'angular2-http-file-upload/uploader/uploader';
import { ObjectAdminUpload } from './jk-objects-list.upload';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Injectable()

export class JkObjectsListService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public getSnippets(objectID?): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object/id/${objectID}`);
    }

    public getSnippetsByParams(params): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object`, {params});
    }

    public setSnippet(form): Observable<IObjectSnippet[]> {
        let message = JSON.stringify({ form });
        return this.http.post<IObjectSnippet[]>(`/api/admin/jk-object/object/create`, message, adminHeaders());
    }

    public updateSnippet(id, form) {
        let message = JSON.stringify({ id, form });
        return this.http.post('/api/admin/jk-object/object/update', message, adminHeaders());
    }

    public deleteSnippet(id): Observable<IObjectSnippet[]> {
        const message = JSON.stringify({ id });
        return this.http.post<IObjectSnippet[]>('/api/admin/jk-object/object/delete', message, adminHeaders());
    }
    
    public getFlats(options): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search/object', { search: options });
    }

    public imageUpload(e) {
        return new Promise((resolve, reject) => {

            const fileList: FileList = e.target.files;
            const uploadFile: File = fileList[0];

            const myUploadItem = new ObjectAdminUpload(uploadFile);
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

    public setPercentLoadedImage(val: number) {
        this.subject.next(val);
    }

    public getPercentLoadedImage(): Observable<number> {
        return this.subject.asObservable();
    }
}
