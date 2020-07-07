import { Component, Input, OnInit } from '@angular/core';
import { IObjectCreditSnippet } from '../../../../../serv-files/serv-modules/jk-objects/credit-api/objects-credit.interfaces';
import { ObjectCreditAdminService } from './object-credit-admin.service';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';

@Component({
    selector: 'app-object-item-purchase',
    templateUrl: 'object-purchase.component.html',
    styleUrls: [
        'object-purchase.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        ObjectCreditAdminService,
        WindowScrollLocker,
    ]
})

export class ObjectPurchaseComponent implements OnInit {

    @Input()
    public objectId: string;

    public showType = 'credit';
    public showModal = false;
    public pageWidth = document.body.clientWidth;

    public snippet: IObjectCreditSnippet;
    public switchOn = false;

    public bankInfo;
    public navList = [
        { name: 'Ипотека', link: 'credit'},
        { name: 'Рассрочка', link: 'installment'},
    ];

    constructor(
        private creditService: ObjectCreditAdminService,
        public scrollBlock: WindowScrollLocker,
    ) { }

    ngOnInit() {
        this.creditService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
                this.buildBank(this.snippet.banks);
            }
        }, (error) => {
            console.error(error);
        });
    }

    public buildBank(bankList) {

        let percent = [];
        let deadline = [];
        let initial = [];
        bankList.forEach( bank => {
            if (bank.percent && Number(bank.percent) > 0) { percent.push(Number(bank.percent)); }
            if (bank.deadline && Number(bank.deadline) > 0) { deadline.push(Number(bank.deadline)); }
            if (bank.initial && Number(bank.initial) > 0) { initial.push(Number(bank.initial)); }
        });
        console.log({
            percent: percent,
            deadline: deadline,
            initial: initial,
        });

        this.bankInfo = {
            percent: Math.min(...percent),
            deadline: Math.min(...deadline),
            initial: Math.min(...initial),
        };
    }
}
