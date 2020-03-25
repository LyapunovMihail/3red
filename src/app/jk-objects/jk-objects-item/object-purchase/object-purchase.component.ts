import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { banks } from './mockBank';
import { ActivatedRoute } from '@angular/router';
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

    public mockBank = banks;
    public moreBanks = false;

    public showType = 'credit';

    public closeModal = true;
    public objectId: string;
    public snippet: IObjectCreditSnippet;
    public switchOn = false;

    constructor(
        private creditService: ObjectCreditAdminService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        this.creditService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            console.log('this.snippet: ', this.snippet);
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
