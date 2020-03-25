import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IObjectMembersSnippet } from '../../../../../serv-files/serv-modules/jk-objects/members-api/objects-members.interfaces';
import { ObjectMembersAdminService } from './object-members-admin/object-members-admin.service';

@Component({
    selector: 'app-object-item-members',
    templateUrl: 'object-members.component.html',
    styleUrls: [
        'object-members.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectMembersAdminService]
})

export class ObjectMembersComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public closeModal = true;
    public objectId: string;
    public snippet: IObjectMembersSnippet;
    public switchOn = false;

    constructor(
        private membersService: ObjectMembersAdminService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        this.getContent();
    }

    public getContent() {
        this.membersService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            console.log('this.contentSnippet: ', this.snippet);
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
        this.membersService.setSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }
}
