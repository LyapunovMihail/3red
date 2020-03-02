import { Component, Input, OnInit } from '@angular/core';
import { banks } from './mockBank';

@Component({
    selector: 'app-object-item-purchase',
    templateUrl: 'object-purchase.component.html',
    styleUrls: [
        'object-purchase.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectPurchaseComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public mockBank = banks;
    public moreBanks = false;

    public showType = 'credit';

    constructor(
    ) { }

    ngOnInit() { }
}
