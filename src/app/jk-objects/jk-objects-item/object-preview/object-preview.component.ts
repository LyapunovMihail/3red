import { Component, Input, OnInit } from '@angular/core';
import { ObjectPreviewAdminService } from './object-preview-admin/object-preview-admin.service';
import {
    IObjectPreviewSnippet,
    OBJECTS_PREVIEW_UPLOADS_PATH
} from '../../../../../serv-files/serv-modules/jk-objects/preview-api/objects-preview.interfaces';

@Component({
    selector: 'app-object-item-preview',
    templateUrl: 'object-preview.component.html',
    styleUrls: ['object-preview.component.scss'],
    providers: [ObjectPreviewAdminService]
})

export class ObjectPreviewComponent implements OnInit {

    @Input()
    public isAuthorizated = false;
    @Input()
    public objectId: string;
    @Input()
    public hasFlats: boolean;

    public closeModal = true;

    public snippet: IObjectPreviewSnippet;

    uploadsPath = `/${OBJECTS_PREVIEW_UPLOADS_PATH}`;

    constructor(
        private previewService: ObjectPreviewAdminService
    ) {
    }

    ngOnInit() {
        this.previewService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
        }, (error) => {
            console.error(error);
        });
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
}
