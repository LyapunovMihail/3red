import { Component, OnInit } from '@angular/core';
import { mockTap } from './mockTaps';

@Component({
    selector: 'app-object-item-builder',
    templateUrl: 'object-item-builder.component.html',
    styleUrls: [
        'object-item-builder.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemBuilderComponent implements OnInit {

    public tempTap = mockTap;

    constructor() { }

    ngOnInit() { }
}
