import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';

@Component({
    selector: 'app-object-item-purchase-modal',
    templateUrl: 'object-item-purchase-modal.component.html',
    styleUrls: [ 'object-item-purchase-modal.component.scss' ],
    providers: [ WindowScrollLocker ]
})

export class ObjectItemPurchaseModalComponent implements OnInit {

    @Input() public bankList;
    @Output() OpenBankList = new EventEmitter<boolean>();
    close (incrased: any) {
        this.OpenBankList.emit(incrased);
    }

    constructor( public scrollLocker: WindowScrollLocker ) { }

    ngOnInit() {
        this.scrollLocker.block();
    }
}
