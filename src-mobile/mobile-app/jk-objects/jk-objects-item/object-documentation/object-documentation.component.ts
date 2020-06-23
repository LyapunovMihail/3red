import { Component, Input, OnInit } from '@angular/core';
import { FILEUPLOADS_UPLOADS_PATH, IObjectDocSnippet } from '../../../../../serv-files/serv-modules/jk-objects/documentation-api/objects-documentation.interfaces';
import { ObjectDocumentationAdminService } from './object-documentation-admin.service';
import * as moment from 'moment';

@Component({
    selector: 'app-object-item-documentation',
    templateUrl: 'object-documentation.component.html',
    styleUrls: [
        'object-documentation.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        ObjectDocumentationAdminService
    ]
})

export class ObjectDocumentationComponent implements OnInit {

    @Input()
    public objectId: string;

    public uploadsPath = FILEUPLOADS_UPLOADS_PATH;
    public closeModal = true;
    public snippet: IObjectDocSnippet;
    public switchOn = false;

    constructor(
        private documentationService: ObjectDocumentationAdminService
    ) { moment.locale('ru'); }

    ngOnInit() {
        this.documentationService.getSnippetById(this.objectId).subscribe((data) => {
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
