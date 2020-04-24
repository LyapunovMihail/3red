import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { ObjectDecorationAdminUpload } from './object-decoration-admin.upload';
import { HttpClient } from '@angular/common/http';
import { Injectable, Inject, forwardRef } from '@angular/core';
import { Uploader } from 'angular2-http-file-upload';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectTabsSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IDecorationData, IObjectDecorationSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/decoration-api/objects-decoration.interfaces';

@Injectable()

export class ObjectDecorationAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient,
        @Inject(forwardRef(() => Uploader)) private uploaderService: Uploader
    ) {
    }

    public getContentSnippetByIdAndTab(objectID): Observable<IObjectDecorationSnippet> {
        return this.http.get<IObjectDecorationSnippet>(`/api/jk-object/decoration/id/${objectID}`);
    }

    public setContentSnippetData(form) {
        return this.http.post('/api/admin/jk-object/decoration/create-update', form, adminHeaders());
    }

    public getTypesSnippetById(objectID): Observable<IObjectTabsSnippet> {
        console.log('get tab snippet');
        return this.http.get<IObjectTabsSnippet>(`/api/jk-object/tabs/id/${objectID}/decoration`);
    }

    public setTypesSnippetData(form) {
        return this.http.post('/api/admin/jk-object/tabs/decoration/create-update', form, adminHeaders());
    }

    public removeTabSlidesFromGallery(tabs) {
        return this.http.post('/api/admin/jk-object/decoration/update', tabs, adminHeaders());
    }

    public setPercentLoadedImage(val: number) {
        this.subject.next(val);
    }

    public getPercentLoadedImage(): Observable<number> {
        return this.subject.asObservable();
    }

    public imageUpload(file) {
        return new Promise((resolve, reject) => {

            const uploadFile: File = file;

            const myUploadItem = new ObjectDecorationAdminUpload(uploadFile);
            myUploadItem.formData = {FormDataKey: 'Form Data Value'};

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

    public setTabsWithTypes(formValue: IObjectDecorationSnippet, typesFormValue: IObjectTabsSnippet, prevTypes: string[]) { // добавляем вкладки с новыми видами отделки, или обновляем вкладки с видами отделки,
        const newFormValue = {...formValue, data: []};
        formValue.data.forEach((item) => {
            if (!item.tab.decorationType) {
                newFormValue.data.push(item);
            }
            if (item.tab.turnOnDecorationTypes) {
                const masTabsWithTypes = [];
                prevTypes.forEach((type, i) => {
                    const tabWithType = formValue.data.find((data) => data.tab.name === item.tab.name && data.tab.decorationType === type);
                    if (tabWithType) {
                        tabWithType.tab.decorationType = typesFormValue.decorationType[i];
                        masTabsWithTypes.push(tabWithType);
                    }
                    if (!formValue.data.some((data) => data.tab.name === item.tab.name && data.tab.decorationType === type)) {
                        masTabsWithTypes.push({
                            images: [],
                            info: [],
                            tab: {name: item.tab.name, show: item.tab.show, decorationType: typesFormValue.decorationType[i]}
                        });
                    }
                });
                console.log('masTabsWithNewTypes: ', masTabsWithTypes);
                newFormValue.data.push(...masTabsWithTypes);
            }
        });
        console.log('newFormValue2: ', newFormValue);
        return newFormValue;
    }
}
