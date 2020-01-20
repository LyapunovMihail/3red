import { Component, Input, OnInit } from '@angular/core';
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

    @Input()
    public isAuthorizated = false;

    public mockBank = banks;
    public moreBanks = false;

    public showType = 'credit';

    constructor(
    ) { }

    ngOnInit() { }
}
