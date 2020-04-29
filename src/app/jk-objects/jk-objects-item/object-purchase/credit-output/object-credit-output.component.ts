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
        console.log('BANKS', this.bankList);
    }

    ngOnChanges(changes) {
        this.activeBanksLength = this.bankList.filter((item) => item.show).length;
    }

    hideEmptyColums(name, banksArr) {
        // Скрываю колонки которые не заполнены не в одном банке
        if ( name === 'percent') {
            return banksArr.filter(item => item.show).some(item => {
                return !(item.percent && item.percent.length > 0);
            });
        }
        if ( name === 'initial') {
            return banksArr.filter(item => item.show).some(item => {
                return !(item.initial && item.initial.length > 0);
            });
        }
        if ( name === 'deadline') {
            return banksArr.filter(item => item.show).some(item => {
                return !(item.deadline && item.deadline.length > 0);
            });
        }
    }

}
