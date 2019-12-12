import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-object-dynamic-schema',
    templateUrl: 'object-dynamic-schema.component.html',
    styleUrls: ['object-dynamic-schema.component.scss']
})

export class ObjectDynamicSchemaComponent implements OnInit {

    @Input()
    public isAuthorizated = false;
    @Input() public objectProgress;

    constructor() { }

    ngOnInit() { }
}