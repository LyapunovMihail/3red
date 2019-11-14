import {Component, EventEmitter, Input, Output} from '@angular/core';
import { PurchaseCreditService } from '../purchase-credit.service';
import {ICreditSnippet} from '../../../../../serv-files/serv-modules/credit-api/credit.interfaces';

@Component({
    selector: 'app-purchase-credit-output',
    templateUrl: './purchase-credit-output.component.html',
    styleUrls: ['./purchase-credit-output.component.scss', './purchase-credit-output-admin.component.scss']
})

export class PurchaseCreditOutputComponent {

    @Input() public isAuthorizated;

    @Input() public bankList: ICreditSnippet[] = [];

    @Output() public showModalBankList = new EventEmitter<boolean>();

    constructor(
        private creditService: PurchaseCreditService
    ) { }

    public deleteSnippet(id) {
        this.creditService.deleteSnippet(id).subscribe(
            (data) => this.bankList = data,
            (error) => console.error(error)
        );
    }

    public updateSnippet(id, key, value) {
        if ( !this.isAuthorizated ) { return; }

        if (key === 'initial' || key === 'percent' || key === 'deadline') {
            value = Number(value);
        }
        this.creditService.updateSnippet(id, key, value).subscribe(
            (data) => this.bankList = data,
            (error) => console.error(error)
        );
    }
}
