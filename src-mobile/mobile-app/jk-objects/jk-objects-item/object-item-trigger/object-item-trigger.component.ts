import { Component, OnInit } from '@angular/core';
import { trigger } from './mockTrigger';

@Component({
    selector: 'app-object-item-trigger',
    templateUrl: 'object-item-trigger.component.html',
    styleUrls: [
        'object-item-trigger.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemTriggerComponent implements OnInit {

    public triggers = trigger;
    
    constructor() { }

    ngOnInit() { }
}
