import { ICreditSnippet, CREDIT_UPLOADS_PATH } from '../../../../serv-files/serv-modules/credit-api/credit.interfaces';
import { PurchaseCreditService } from './purchase-credit.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-purchase-credit',
    templateUrl: './purchase-credit.component.html',
    styleUrls: ['./../purchase.component.scss'],
    providers: [
        PurchaseCreditService
    ]
})

export class PurchaseCreditComponent implements OnInit {

    public snippetArray: ICreditSnippet[] = [];

    public uploadsPath: string = `/${CREDIT_UPLOADS_PATH}`;

    constructor(
        private creditService: PurchaseCreditService
    ) { }

    public ngOnInit() {
        this.creditService.getSnippet().subscribe(
            (data) => this.snippetArray = data,
            (error) => {
                console.error(error);
            }
        );
    }
}
