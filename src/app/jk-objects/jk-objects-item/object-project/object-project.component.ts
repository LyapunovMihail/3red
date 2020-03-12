import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectProjectAdminService } from './object-project-admin/object-project-admin.service';
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
    public isAuthorizated = false;

    @Input()
    public objectName: string;

    public closeModal = true;
    public objectId: string;
    public snippet: IObjectProjectSnippet;
    public switchOn = false;

    constructor(
        private projectService: ObjectProjectAdminService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        this.projectService.getSnippetById(this.objectId).subscribe((data) => {
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
        this.projectService.setSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }
}
