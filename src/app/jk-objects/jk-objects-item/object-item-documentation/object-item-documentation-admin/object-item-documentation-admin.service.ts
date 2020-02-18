import { Uploader } from 'angular2-http-file-upload';
import { ObjectItemDocumentationAdminUpload } from './object-item-documentation-admin.upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable, forwardRef, Inject } from '@angular/core';
import { IObjectDocSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/documentation-api/objects-documentation.interfaces';

@Injectable()
export class ObjectItemDocumentationAdminService {

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

    public fileUpload(fileList: FileList) {
        return new Promise((resolve, reject) => {
            let index = 0;

            const upload = (i) => {
                this.setCurrentLoadedFile(i + 1);
                const myUploadItem = new ObjectItemDocumentationAdminUpload(fileList[i]);
                myUploadItem.formData = {FormDataKey: 'Form Data Value'};
                this.uploaderService.upload(myUploadItem);
            };

            upload(index);

            this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                if (index < fileList.length - 1) {
                    index++;
                    upload(index);
                } else {
                    resolve(response);
                }
            };

            this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                reject(response);
            };
        });
    }
}
