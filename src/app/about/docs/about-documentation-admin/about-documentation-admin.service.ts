import { Uploader } from 'angular2-http-file-upload';
import { AboutDocumentationAdminUpload } from './about-documentation-admin.upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { adminHeaders } from '../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable, forwardRef, Inject } from '@angular/core';
import { IDocSnippet } from '../../../../../serv-files/serv-modules/about/documentation-api/about-documentation.interfaces';

@Injectable()
export class AboutDocumentationAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public getSnippet(): Observable<IDocSnippet> {
        return this.http.get<IDocSnippet>(`/api/about/docs`);
    }

    public setSnippetData(data): Observable<IDocSnippet> {
        return this.http.post<IDocSnippet>('/api/admin/about/docs/create-update', data , adminHeaders());
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
                const myUploadItem = new AboutDocumentationAdminUpload(fileList[i]);
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
