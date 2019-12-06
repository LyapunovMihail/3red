import { Component, Input, OnInit } from '@angular/core';
import { ObjectsItemPreviewAdminService } from './objects-item-preview-admin/objects-item-preview-admin.service';
import { ActivatedRoute } from '@angular/router';
import { IObjectPreviewSnippet, OBJECTS_PREVIEW_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/preview-api/objects-preview.interfaces';

@Component({
    selector: 'app-object-item-preview',
    templateUrl: 'object-item-preview.component.html',
    styleUrls: ['object-item-preview.component.scss'],
    providers: [ObjectsItemPreviewAdminService]
})

export class ObjectItemPreviewComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public closeModal = true;
    public objectId: string;
    public snippet: IObjectPreviewSnippet;

    uploadsPath = `/${OBJECTS_PREVIEW_UPLOADS_PATH}`;

    constructor(
        private previewService: ObjectsItemPreviewAdminService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        this.previewService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
        }, (error) => {
            console.error(error);
        });
    }
}
