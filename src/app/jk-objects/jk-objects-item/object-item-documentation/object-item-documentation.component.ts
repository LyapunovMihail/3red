import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FILEUPLOADS_UPLOADS_PATH, IObjectDocSnippet } from '../../../../../serv-files/serv-modules/jk-objects/documentation-api/objects-documentation.interfaces';
import { ObjectItemDocumentationAdminService } from './object-item-documentation-admin/object-item-documentation-admin.service';
import { Uploader } from 'angular2-http-file-upload/uploader/uploader';

@Component({
    selector: 'app-object-item-documentation',
    templateUrl: 'object-item-documentation.component.html',
    styleUrls: [
        'object-item-documentation.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        ObjectItemDocumentationAdminService,
        Uploader
    ]
})

export class ObjectItemDocumentationComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public uploadsPath = FILEUPLOADS_UPLOADS_PATH;
    public closeModal = true;
    public objectId: string;
    public snippet: IObjectDocSnippet;
    public switchOn = false;

    constructor(
        private documentationService: ObjectItemDocumentationAdminService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        this.documentationService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.snippet, objectId: this.objectId, switchOn: this.switchOn};
        this.documentationService.setSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }
}
