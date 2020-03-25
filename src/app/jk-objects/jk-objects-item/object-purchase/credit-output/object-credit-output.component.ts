import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
    selector: 'app-object-credit-output',
    templateUrl: './object-credit-output.component.html',
    styleUrls: ['./object-credit-output.component.scss']
})

export class ObjectCreditOutputComponent implements OnInit, OnChanges {

    @Input() public isAuthorizated;

    @Input() public bankList = [];

    public moreBanks = false;

    public blockHeight: number;

    public activeBanksLength: number;

    constructor(
    ) { }

    ngOnInit() {
        this.activeBanksLength = this.bankList.filter((item) => item.show).length;
    }

    ngOnChanges(changes) {
        this.activeBanksLength = this.bankList.filter((item) => item.show).length;
    }

}
