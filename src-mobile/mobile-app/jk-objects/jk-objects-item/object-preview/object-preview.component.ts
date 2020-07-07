import { Component, Input, OnInit } from '@angular/core';
import { ObjectPreviewAdminService } from './object-preview-admin.service';
import { IObjectPreviewSnippet, OBJECTS_PREVIEW_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/preview-api/objects-preview.interfaces';
import { HeaderService } from '../../../header/header.service';

@Component({
    selector: 'app-object-item-preview',
    templateUrl: 'object-preview.component.html',
    styleUrls: ['object-preview.component.scss'],
    providers: [
        ObjectPreviewAdminService,
        HeaderService
    ]
})

export class ObjectPreviewComponent implements OnInit {

    @Input()
    public objectId: string;

    public closeModal = true;

    public snippet: IObjectPreviewSnippet;

    uploadsPath = `/${OBJECTS_PREVIEW_UPLOADS_PATH}`;

    public year: number;
    public month: number;

    constructor(
        private previewService: ObjectPreviewAdminService,
        public headerService: HeaderService,
        
    ) { }

    ngOnInit() {
        this.previewService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
        }, (error) => {
            console.error(error);
        });

        this.getDynamicLink();
    }

    private getDynamicLink() {
        this.headerService.getDynamicLink()
            .subscribe(
                (data) => {
                    const date = new Date();
                    this.year = data.year ? data.year : date.getFullYear();
                    this.month = data.month ? data.month : ( date.getMonth() + 1 );
                },
                (err) => {
                    console.error(err);
                    const date = new Date();
                    this.year = date.getFullYear();
                    this.month = date.getMonth() + 1;
                }
            );
    }
}
