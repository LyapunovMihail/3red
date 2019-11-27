import { Component, Input, OnInit } from '@angular/core';
import { mockDocuments } from './mockDoc';

@Component({
    selector: 'app-object-item-documentation',
    templateUrl: 'object-item-documentation.component.html',
    styleUrls: [
        'object-item-documentation.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemDocumentationComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public mockDoc = mockDocuments;

    constructor() { }

    ngOnInit() { }
}
