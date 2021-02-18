import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
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

    public maxHeight: any = 'auto';
    public startHeight: any = 'auto';
    public showAllDocs = false;
    @ViewChild('fileList', { static: false })
        public fileList: ElementRef;

    constructor(
        private documentationService: AboutDocumentationAdminService,
        public ref: ChangeDetectorRef,
    ) { moment.locale('ru'); }

    ngOnInit() {
        this.documentationService.getSnippet().subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
                this.setHeight(this.snippet);
            }
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
