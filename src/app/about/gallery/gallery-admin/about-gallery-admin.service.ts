import { adminHeaders } from '../../../commons/admin-headers.utilit';
import { AboutGalleryAdminUpload } from './about-gallery-admin.upload';
import { Uploader } from 'angular2-http-file-upload';
import { Injectable, Inject, forwardRef  } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { HttpClient } from '@angular/common/http';

@Injectable()

export class AboutGalleryAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) { }

    setCurrentLoadedImage(val: number) {
        this.subject.next(val);
    }

    getCurrentLoadedImage(): Observable<number> {
        return this.subject.asObservable();
    }

    deleteSnippet(id) {
        const message = JSON.stringify({ id });
        return this.http.post('/api/admin/gallery/delete', message, adminHeaders());
    }

    changeImage(id, e) {
        return new Promise((resolve, reject) => {
            const fileList: FileList = e.target.files;
            const url = '/api/admin/gallery/image/update';
            const myUploadItem = new AboutGalleryAdminUpload(url, fileList[0], id);
            myUploadItem.formData = { FormDataKey: 'Form Data Value' };
            this.uploaderService.upload(myUploadItem);
            this.uploaderService.onSuccessUpload = (item, response, status, headers) => {
                resolve(JSON.parse(response));
            };
            this.uploaderService.onErrorUpload = (item, response, status, headers) => {
                reject(response);
            };
        });
    }

    // Рекурсивная загрузка изображений
    imageUpload(fileList: FileList, type) {
        return new Promise((resolve, reject) => {
            let index = 0;
            const url = '/api/admin/gallery/image/create';

            const upload = (i) => {
                this.setCurrentLoadedImage(i + 1);
                const myUploadItem = new AboutGalleryAdminUpload(url, fileList[i], type);
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
            // this.uploaderService.onCompleteUpload = (item, response, status, headers) => {};
            // this.uploaderService.onProgressUpload = (item, percentComplete) => {};
        });
    }

}
