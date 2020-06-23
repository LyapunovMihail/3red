import { Component, OnInit } from '@angular/core';
import { AboutDocumentationAdminService } from './about-documentation-admin.service';
import { Uploader } from 'angular2-http-file-upload/uploader/uploader';
import * as moment from 'moment';
import { FILEUPLOADS_UPLOADS_PATH, IDocSnippet } from '../../../../serv-files/serv-modules/about/documentation-api/about-documentation.interfaces';

@Component({
    selector: 'app-about-documentation',
    templateUrl: 'about-documentation.component.html',
    styleUrls: [
        'about-documentation.component.scss'
    ],
    providers: [
        AboutDocumentationAdminService,
        Uploader
    ]
})

export class AboutDocumentationComponent implements OnInit {

    public uploadsPath = FILEUPLOADS_UPLOADS_PATH;
    public snippet: IDocSnippet;
    public switchOn = false;

    constructor(
        private documentationService: AboutDocumentationAdminService
    ) { moment.locale('ru'); }

    ngOnInit() {
        this.documentationService.getSnippet().subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }

    public parseDate(date) {
        if (moment(date, 'DD.MM.YYYY').isValid()) {
            return date;
        } else {
            return moment(date).format('DD.MM.YYYY');
        }
    }
}
