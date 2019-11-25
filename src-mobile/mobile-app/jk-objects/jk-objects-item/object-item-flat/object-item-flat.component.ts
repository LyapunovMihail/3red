import { Component, OnInit } from '@angular/core';
import { placement, mockHouse } from './object-flat.config';

@Component({
    selector: 'app-object-item-flat',
    templateUrl: 'object-item-flat.component.html',
    styleUrls: [
        'object-item-flat.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemFlatComponent implements OnInit {

    public genplanPlacement = placement;
    public tempHouse = mockHouse;

    constructor() { }

    ngOnInit() { }
}
