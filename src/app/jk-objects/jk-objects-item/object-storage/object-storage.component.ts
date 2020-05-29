import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-object-item-storage',
    templateUrl: 'object-storage.component.html',
    styleUrls: [
        'object-storage.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectStorageComponent implements OnInit {

    @Input() public objectId;

    constructor() { }

    ngOnInit() { }
}
