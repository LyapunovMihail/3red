import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { OBJECTS_CREDIT_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/jk-objects/credit-api/objects-credit.interfaces';

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
    uploadsPath = `/${OBJECTS_CREDIT_UPLOADS_PATH}`;

    constructor(
    ) { }

    ngOnInit() {
        this.activeBanksLength = this.bankList.filter((item) => item.show).length;
    }

    ngOnChanges(changes) {
        this.activeBanksLength = this.bankList.filter((item) => item.show).length;
    }

    hideEmptyColums(name, banksArr) {
        // Скрываю колонки которые не заполнены не в одном банке
        if ( name === 'percent') {
            return !(banksArr.filter(item => item.show).some(item => item.percent && item.percent.length > 0));
        }
        if ( name === 'initial') {
            return !(banksArr.filter(item => item.show).some(item => item.initial && item.initial.length > 0));
        }
        if ( name === 'deadline') {
            return !(banksArr.filter(item => item.show).some(item => item.deadline && item.deadline.length > 0));
        }
    }

}
