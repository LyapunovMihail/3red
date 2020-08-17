import { Uploader } from 'angular2-http-file-upload';
import { ObjectDocumentationAdminUpload } from './object-documentation-admin.upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable, forwardRef, Inject } from '@angular/core';
import { IObjectDocSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/documentation-api/objects-documentation.interfaces';
import { ObjectDecorationAdminUpload } from '../../object-decoration/object-decoration-content-admin/object-decoration-admin.upload';

@Injectable()
export class ObjectDocumentationAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public getSnippetById(objectID): Observable<IObjectDocSnippet> {
        return this.http.get<IObjectDocSnippet>(`/api/jk-object/docs/id/${objectID}`);
    }

    public setSnippetData(data): Observable<IObjectDocSnippet> {
        return this.http.post<IObjectDocSnippet>('/api/admin/jk-object/docs/create-update', data , adminHeaders());
    }

    public setCurrentLoadedFile(val: number) {
        this.subject.next(val);
    }

    public getCurrentLoadedFile(): Observable<number> {
        return this.subject.asObservable();
    }

    public fileUpload(file) {
        return new Promise((resolve, reject) => {

            const uploadFile: File = file;

            const myUploadItem = new ObjectDocumentationAdminUpload(uploadFile);
            myUploadItem.formData = {FormDataKey: 'Form Data Value'};

            this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                resolve(response);
            };
            this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                reject(response);
            };
            // this.uploaderService.onCompleteUpload = (item, response, status, headers) => {};
            this.uploaderService.onProgressUpload = (item, percentComplete) => {
                this.setCurrentLoadedFile(percentComplete);
            };
            this.uploaderService.upload(myUploadItem);
        });
    }
}
