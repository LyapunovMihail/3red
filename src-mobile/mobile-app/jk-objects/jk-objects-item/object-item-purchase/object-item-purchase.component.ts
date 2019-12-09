import { Component, OnInit, Input } from '@angular/core';
import { banks } from './mockBank';

@Component({
    selector: 'app-object-item-purchase',
    templateUrl: 'object-item-purchase.component.html',
    styleUrls: [
        'object-item-purchase.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemPurchaseComponent implements OnInit {

    public mockBank = banks;
    public OpenBankList = false;
    close(increased: any) {
        this.OpenBankList = increased;
        console.log(this.OpenBankList);
    }

    public showType = 'credit';

    constructor() { }

    ngOnInit() { }
}