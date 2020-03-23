import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { banks } from './mockBank';

@Component({
    selector: 'app-object-item-purchase',
    templateUrl: 'object-purchase.component.html',
    styleUrls: [
        'object-purchase.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectPurchaseComponent implements OnInit, OnChanges {

    @Input()
    public isAuthorizated = false;

    public mockBank = banks;
    public moreBanks = false;

    public showType = 'credit';

    constructor(
    ) { }

    ngOnInit() { }

    ngOnChanges(changes) {
        if (this.isAuthorizated) {
            this.showType = 'credit';
        }
    }
}
