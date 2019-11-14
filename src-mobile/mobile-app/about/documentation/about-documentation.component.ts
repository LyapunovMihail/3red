import { AboutDocumentationService } from './about-documentation.service';
import { FILEUPLOADS_UPLOADS_PATH } from '../../../../serv-files/serv-modules/fileuploads-api/fileuploads.interfaces';
import { IDocumentationItem, IDocumentationDescription } from '../../../../serv-files/serv-modules/documentation-api/documentation.interfaces';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector: 'app-about-documentation',
    templateUrl: './about-documentation.component.html',
    styleUrls: ['./about-documentation.component.scss'],
    providers: [
        AboutDocumentationService
    ]
})
export class AboutDocumentationComponent implements OnInit {

    public objectsList;
    public uploadsPath: string = FILEUPLOADS_UPLOADS_PATH;
    public description: string;

    constructor(
        private docsService: AboutDocumentationService
    ) { }

    public ngOnInit() {
        moment.locale('ru');
        this.getObjects();
        this.getHeaderDescription();
    }

    public getHeaderDescription() {
        this.docsService.getHeaderDescription.subscribe((data: IDocumentationDescription) => {
            this.description = data.description;
        });
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
