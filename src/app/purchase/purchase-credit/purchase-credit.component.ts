import { ICreditSnippet } from '../../../../serv-files/serv-modules/credit-api/credit.interfaces';
import { PurchaseCreditService } from './purchase-credit.service';
import { AuthorizationObserverService } from './../../authorization/authorization.observer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

@Component({
    selector: 'app-purchase-credit',
    templateUrl: './purchase-credit.component.html',
    styleUrls: ['./purchase-credit.component.scss'],
    providers: [
        WindowScrollLocker,
        PurchaseCreditService,
    ]
})

export class PurchaseCreditComponent implements OnInit, OnDestroy {

    public isAuthorizated = false;

    public snippetArray: ICreditSnippet[] = [];

    public AuthorizationEvent;

    public showModalBankList = false;

    public params: any;

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        private authorization: AuthorizationObserverService,
        private creditService: PurchaseCreditService
    ) { }

    public ngOnInit() {
        this.AuthorizationEvent = this.authorization.getAuthorization()
            .subscribe( (val) => {
                this.isAuthorizated = val;
                if (this.isAuthorizated) {
                    this.getActiveSnippet();
                } else {
                    // this.getActiveSnippetWithParams();
                    this.getActiveSnippet();
                }
            });


    }

    public ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    public getActiveSnippet() {
        this.creditService.getActiveSnippet().subscribe(
            (data) => {
                this.snippetArray = data;
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public getActiveSnippetWithParams() {
        this.creditService.getActiveSnippetWithParams(this.params).subscribe(
            (data) => {
                this.snippetArray = data;
                this.creditService.calculateMonthPay(this.params, this.snippetArray);
            },
            (error) => {
                console.error(error);
            }
        );
    }

    public formChange(form) {

        const params = {
            price: form.price.val,
            firstpay: form.firstpay.val,
            initial: (Math.round((form.firstpay.val / form.price.val) * 100)), // Подсчет минимального взноса в % (первый платёж поделённый на цену квартиры)
            deadline: form.deadline.val,
            // military: form.military,
            // maternal: form.maternal,
            // nationality: form.nationality
        };
        this.params = params;

        if (!this.isAuthorizated) {

            if (form.price.val === form.price.min && form.firstpay.val === form.firstpay.min && form.deadline.val === form.deadline.min ) {
                this.getActiveSnippet();
            } else {
                this.getActiveSnippetWithParams();
            }
        }
    }

}
