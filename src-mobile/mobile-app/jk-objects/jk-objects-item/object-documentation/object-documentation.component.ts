import { Component, Input, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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

    public maxHeight: any = 'auto';
    public startHeight: any = 'auto';
    public showAllDocs = false;
    @ViewChild('fileList')
        public fileList: ElementRef;

    constructor(
        private documentationService: ObjectDocumentationAdminService,
        public ref: ChangeDetectorRef,
    ) { moment.locale('ru'); }

    ngOnInit() {
        this.documentationService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
            this.setHeight(this.snippet);
        }, (error) => {
            console.error(error);
        });
    }

    public setHeight(data) {
        if (data.block.length > 3) {
            setTimeout( () => {
                this.maxHeight = this.fileList.nativeElement.children[0].clientHeight + this.fileList.nativeElement.children[1].clientHeight - 5;
                this.startHeight = this.fileList.nativeElement.children[0].clientHeight + this.fileList.nativeElement.children[1].clientHeight - 5;
                this.ref.detectChanges();
            }, 1000);
        }
    }
    public showAll() {
        if (!this.showAllDocs) {
            this.maxHeight = this.fileList.nativeElement.clientHeight;
            this.showAllDocs = true;
        } else {
            this.maxHeight = this.startHeight;
            this.showAllDocs = false;
        }
    }

    public parseDate(date) {
        if (moment(date, 'DD.MM.YYYY').isValid()) {
            return date;
        } else {
            return moment(date).format('DD.MM.YYYY');
        }
    }
}
