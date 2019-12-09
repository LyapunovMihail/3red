import { Component, OnInit } from '@angular/core';
import { placement, mockHouse } from './object-flat.config';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';

@Component({
    selector: 'app-object-item-flat',
    templateUrl: 'object-item-flat.component.html',
    styleUrls: [
        'object-item-flat.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        WindowScrollLocker
    ]
})

export class ObjectItemFlatComponent implements OnInit {

    public openSchema = false;

    public genplanPlacement = placement;
    public tempHouse = mockHouse;

    constructor( public scrollBlock: WindowScrollLocker ) { }

    ngOnInit( ) { }

    public openTooltipSchema() {
        this.openSchema = !this.openSchema;

        if( this.openSchema && window.innerWidth < 760) {
            this.scrollBlock.block();
        } else if ( !this.openSchema && window.innerWidth > 760 ) {
            this.scrollBlock.unblock();
        } else { this.scrollBlock.unblock(); }
    }
}
