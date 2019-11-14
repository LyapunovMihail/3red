import { Uploader } from 'angular2-http-file-upload';
import { DocumentationAdminUpload } from './about-documentation-admin.upload';
import { IDocumentationItem, IDocumentationDescription } from '../../../../serv-files/serv-modules/documentation-api/documentation.interfaces';
import { Observable, BehaviorSubject } from 'rxjs';
import { adminHeaders } from '../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable, forwardRef, Inject } from '@angular/core';

@Injectable()
export class AboutDocumentationService {

    public subject = new BehaviorSubject<number>(0);

    constructor (
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    public setCurrentLoadedFile(val: number) {
        this.subject.next(val);
    }

    public getCurrentLoadedFile(): Observable<number> {
        return this.subject.asObservable();
    }

    public get createObject(): Observable<IDocumentationItem[]> {
        return this.http.post<IDocumentationItem[]>('/api/admin/documentation/create', null, adminHeaders());
    }

    public get getObjects(): Observable<IDocumentationItem[]> {
        return this.http.get<IDocumentationItem[]>('/api/documentation/list');
    }

    public get getHeaderDescription(): Observable<IDocumentationDescription> {
        return this.http.get<IDocumentationDescription>('/api/documentation/header');
    }

    public updateHeaderDescription(description): Observable<IDocumentationDescription> {
        return this.http.post<IDocumentationDescription>('/api/admin/documentation/header/update', {description}, adminHeaders());
    }

    public deleteObject(id): Observable<IDocumentationItem[]> {
        return this.http.post<IDocumentationItem[]>('/api/admin/documentation/delete', {id}, adminHeaders());
    }

    public updateObjectTitle(id, title): Observable<IDocumentationItem[]> {
        return this.http.post<IDocumentationItem[]>('/api/admin/documentation/update', {id, title}, adminHeaders());
    }

    public fileUpload(id, fileList: FileList) {
        return new Promise((resolve, reject) => {
            let index = 0;
            let url = '/api/admin/gallery/image/create';

            let upload = (i) => {
                this.setCurrentLoadedFile(i + 1);
                let myUploadItem = new DocumentationAdminUpload(fileList[i], id);
                myUploadItem.formData = { FormDataKey: 'Form Data Value' };
                this.uploaderService.upload(myUploadItem);
            };

            upload(index);

            this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                if (index < fileList.length - 1) {
                    index ++ ;
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

    public deleteFile(id, file): Observable<IDocumentationItem[]> {
        return this.http.post<IDocumentationItem[]>('/api/admin/documentation/file/delete', {id, file}, adminHeaders())
    }
}
