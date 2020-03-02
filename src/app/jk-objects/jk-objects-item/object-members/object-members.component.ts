import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-object-item-members',
    templateUrl: 'object-members.component.html',
    styleUrls: [
        'object-members.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectMembersComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    constructor() { }

    ngOnInit() { }
}
