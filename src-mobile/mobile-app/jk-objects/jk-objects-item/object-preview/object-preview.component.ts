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
        ObjectPreviewAdminService
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
        const date = new Date();
        this.lastMothWithPhotos = date.getMonth() + 1;
        this.lastYearWithPhotos = date.getFullYear();
        this.setLastDateWithPhotos();
        this.setVisibilityForDynamicBtn();
    }

    private setLastDateWithPhotos() {
        this.subs.push(this.previewService.getDynamicLinkForPhotos(this.objectId).subscribe((data: IObjectDynamicSnippet[]) => {
            if (data.length > 0) {
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

    private setVisibilityForDynamicBtn() {
        this.previewService.getTabsSnippetById(this.objectId).subscribe(data => {
            if (!data || !data.dynamic) {
                return;
            }
            this.hasPhotos = data.dynamic.some(el => el.show);
        });
    }

    concatTitle(titleFragments: string[]): string {
        let retval = '';
        if (titleFragments) {
            titleFragments.forEach((fragment) => {
                if (fragment.length > 0) {
                    if (retval.length > 0) {
                        fragment = ' - ' + fragment;
                    }
                    retval = retval + fragment;
                }
            });
        }
        return retval;
    }

    ngOnDestroy() {
        this.subs.forEach(item => item.unsubscribe());
    }
}
