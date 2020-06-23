import { Component, Input, OnInit } from '@angular/core';
import { ObjectProjectAdminService } from './object-project-admin.service';
import { IObjectProjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/project-api/objects-project.interfaces';

@Component({
    selector: 'app-object-item-project',
    templateUrl: 'object-project.component.html',
    styleUrls: [
        'object-project.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectProjectAdminService]
})

export class ObjectProjectComponent implements OnInit {

    @Input()
    public objectId: string;
    @Input()
    public objectName: string;

    public closeModal = true;
    public snippet: IObjectProjectSnippet;
    public switchOn = false;

    constructor(
        private projectService: ObjectProjectAdminService
    ) { }

    ngOnInit() {
        this.projectService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }
}
