import { Component, Input, OnInit } from '@angular/core';
import { IObjectCreditSnippet } from '../../../../../serv-files/serv-modules/jk-objects/credit-api/objects-credit.interfaces';
import { ObjectCreditAdminService } from './object-credit-admin.service';

@Component({
    selector: 'app-object-item-purchase',
    templateUrl: 'object-purchase.component.html',
    styleUrls: [
        'object-purchase.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectCreditAdminService]
})

export class ObjectPurchaseComponent implements OnInit {

    @Input()
    public objectId: string;

    public showType = 'credit';

    public snippet: IObjectCreditSnippet;
    public switchOn = false;

    constructor(
        private creditService: ObjectCreditAdminService
    ) { }

    ngOnInit() {
        this.creditService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }

}
