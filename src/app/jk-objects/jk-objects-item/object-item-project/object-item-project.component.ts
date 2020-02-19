import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectsItemProjectAdminService } from './objects-item-project-admin/objects-item-project-admin.service';
import { IObjectProjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/project-api/objects-project.interfaces';

@Component({
    selector: 'app-object-item-project',
    templateUrl: 'object-item-project.component.html',
    styleUrls: [
        'object-item-project.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectsItemProjectAdminService]
})

export class ObjectItemProjectComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public closeModal = true;
    public objectId: string;
    public snippet: IObjectProjectSnippet;
    public switchOn = false;

    constructor(
        private projectService: ObjectsItemProjectAdminService,
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
