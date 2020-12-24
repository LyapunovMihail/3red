import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ObjectCreditAdminService } from './credit-admin/object-credit-admin.service';
import { IObjectCreditSnippet } from '../../../../../serv-files/serv-modules/jk-objects/credit-api/objects-credit.interfaces';

@Component({
    selector: 'app-object-item-purchase',
    templateUrl: 'object-purchase.component.html',
    styleUrls: [
        'object-purchase.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectCreditAdminService]
})

export class ObjectPurchaseComponent implements OnInit, OnChanges {

    @Input()
    public isAuthorizated = false;
    @Input()
    public objectId: string;

    public showType = 'credit';

    public closeModal = true;
    public snippet: IObjectCreditSnippet;
    public switchOn = false;

    public navList = [
        { name: 'Ипотека', link: 'credit' },
        { name: 'Рассрочка', link: 'installment' }
    ];

    constructor(
        private creditService: ObjectCreditAdminService
    ) { }

    ngOnInit() {
        this.creditService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            console.log('banks: ', this.snippet);
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.snippet, objectId: this.objectId, switchOn: this.switchOn};
        this.creditService.setSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }

    ngOnChanges(changes) {
        if (this.isAuthorizated) {
            this.showType = 'credit';
        }
    }
}
