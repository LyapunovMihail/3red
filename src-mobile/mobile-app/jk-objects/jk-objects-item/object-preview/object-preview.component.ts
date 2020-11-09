import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ObjectPreviewAdminService } from './object-preview-admin.service';
import { IObjectPreviewSnippet, OBJECTS_PREVIEW_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/preview-api/objects-preview.interfaces';
import { HeaderService } from '../../../header/header.service';
import { IObjectDynamicSnippet } from '../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { Subscription } from 'rxjs';
import { IObjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-object-item-preview',
    templateUrl: 'object-preview.component.html',
    styleUrls: ['object-preview.component.scss'],
    providers: [
        ObjectPreviewAdminService,
        HeaderService
    ]
})

export class ObjectPreviewComponent implements OnInit, OnDestroy {

    @Input()
    public objectId: string;
    @Input()
    public hasFlats: boolean;

    public closeModal = true;

    public snippet: IObjectPreviewSnippet;
    public object: IObjectSnippet;

    uploadsPath = `/${OBJECTS_PREVIEW_UPLOADS_PATH}`;

    // public year: number;
    // public month: number;
    public hasPhotos = false;
    public lastMothWithPhotos: number;
    public lastYearWithPhotos: number;
    private subs: Subscription[] = [];

    constructor(
        private previewService: ObjectPreviewAdminService,
        public headerService: HeaderService,
    ) {
    }

    ngOnInit() {
        this.getSnippetById();
        this.getDynamicLink();

        this.previewService.getObjectById(this.objectId).subscribe(
            data => this.object = data[0],
            err => console.error(err)
        );
    }

    private getSnippetById() {
        this.subs.push(
            this.previewService.getSnippetById(this.objectId).subscribe((data) => {
                this.snippet = data;
            }, (error) => {
                console.error(error);
            })
        );
    }

    private getDynamicLink() {
        this.subs.push(this.headerService.getDynamicLinkForPhotos(this.objectId).subscribe((data: IObjectDynamicSnippet[]) => {
            if (data.length > 0) {
                this.hasPhotos = true;
                this.lastMothWithPhotos = 0;
                this.lastYearWithPhotos = 0;
                data.forEach((item) => {
                    if (item && item.year && item.year > this.lastYearWithPhotos) {
                        this.lastYearWithPhotos = item.year;
                    }
                    if (item && item.month && item.month > this.lastMothWithPhotos) {
                        this.lastMothWithPhotos = item.month;
                    }
                });
            }
        }));
    }

    concatTitle(titleFragments: string[]): string {
        let retval: string = '';
        if (titleFragments) {
            titleFragments.forEach((fragment) => {
                if (fragment.length > 0) {
                    if (retval.length > 0) {
                        fragment = ' - ' + fragment;
                    }
                    retval = retval + fragment
                }
            })
        }
        return retval;
    }

    // private getDynamicLink() {
    //     this.headerService.getDynamicLink()
    //         .subscribe(
    //             (data) => {
    //                 const date = new Date();
    //                 this.year = data.year ? data.year : date.getFullYear();
    //                 this.month = data.month ? data.month : ( date.getMonth() + 1 );
    //             },
    //             (err) => {
    //                 console.error(err);
    //                 const date = new Date();
    //                 this.year = date.getFullYear();
    //                 this.month = date.getMonth() + 1;
    //             }
    //         );
    // }

    ngOnDestroy() {
        this.subs.forEach(item => item.unsubscribe());
    }
}
