import { AboutDocumentationService } from './about-documentation.service';
import { FILEUPLOADS_UPLOADS_PATH } from '../../../../serv-files/serv-modules/fileuploads-api/fileuploads.interfaces';
import { Uploader } from 'angular2-http-file-upload';
import { IDocumentationItem, IDocumentationDescription } from '../../../../serv-files/serv-modules/documentation-api/documentation.interfaces';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-about-documentation',
    templateUrl: './about-documentation.component.html',
    styleUrls: ['./about-documentation.component.scss'],
    providers: [
        AboutDocumentationService,
        Uploader
    ]
})
export class AboutDocumentationComponent implements OnInit {

    public AuthorizationEvent: Subscription;
    public isAuthorizated: boolean;
    public objectsList;
    public progressEvent;
    public progressCount: number;
    public progressCurrent: number;
    public progressLoaded: boolean = false;
    public uploadsPath: string = FILEUPLOADS_UPLOADS_PATH;
    public description: string;

    constructor(
        private authorization: AuthorizationObserverService,
        private docsService: AboutDocumentationService
    ) { }

    public ngOnInit() {
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });
        moment.locale('ru');
        this.getObjects();
        this.getHeaderDescription();
    }

    public createObject() {
        this.docsService.createObject.subscribe((data: IDocumentationItem[]) => {
            this.objectsList = data;
        });
    }

    public getHeaderDescription() {
        this.docsService.getHeaderDescription.subscribe((data: IDocumentationDescription) => {
            this.description = data.description;
        });
    }

    public updateHeaderDescription(description) {
        this.docsService.updateHeaderDescription(description).subscribe((data: IDocumentationDescription) => {
            this.description = data.description;
        });
    }

    public deleteObject(id) {
        if (confirm(`Удалить раздел?`)) {
            this.docsService.deleteObject(id).subscribe((data: IDocumentationItem[]) => {
                this.objectsList = data;
            });
        }
    }

    public updateObjectTitle(id, title) {
        this.docsService.updateObjectTitle(id, title).subscribe((data: IDocumentationItem[]) => {
            this.objectsList = data;
        });
    }

    public fileUpload(id, e) {
        let fileList: FileList = e.target.files;
        this.progressCount = fileList.length;
        this.progressLoaded = true;
        this.progressEvent = this.docsService.getCurrentLoadedFile().subscribe((val) => {
            this.progressCurrent = val + 1;
        });
        this.docsService.fileUpload(id, fileList)
            .then((data: IDocumentationItem[]) => {
                this.progressCount = 0;
                this.progressLoaded = false;
                this.progressEvent.unsubscribe();
                this.objectsList = data;
            })
            .catch((err) => {
                console.error(err);
                this.progressEvent.unsubscribe();
                alert('Что-то пошло не так!');
            });
    }

    public deleteFile(id, file) {
        if (confirm(`Удалить файл ${file.originalName}?`)) {
            this.docsService.deleteFile(id, file).subscribe((data: IDocumentationItem[]) => {
                this.objectsList = data;
            });
        }
    }

    private getObjects() {
        this.docsService.getObjects.subscribe((data: IDocumentationItem[]) => {
            this.objectsList = data;
        }, (err) => {
            console.log(err);
        });
    }

    public parseDate(createdAt) {
        return moment(createdAt).format('L');
    }

}
