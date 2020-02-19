import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-object-item-members',
    templateUrl: 'object-item-members.component.html',
    styleUrls: [
        'object-item-members.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemMembersComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    constructor() { }

    ngOnInit() { }
}
