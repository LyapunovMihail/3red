import { Component, Input, OnInit } from '@angular/core';
import { IObjectMembersSnippet } from '../../../../../serv-files/serv-modules/jk-objects/members-api/objects-members.interfaces';
import { ObjectMembersAdminService } from './object-members-admin.service';

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
    public objectId: string;

    public snippet: IObjectMembersSnippet;
    public switchOn = false;

    constructor(
        private membersService: ObjectMembersAdminService
    ) { }

    ngOnInit() {
        this.getContent();
    }

    public getContent() {
        this.membersService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }
}
