import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-object-credit-output',
    templateUrl: './object-credit-output.component.html',
    styleUrls: ['./object-credit-output.component.scss']
})

export class ObjectCreditOutputComponent {

    @Input() public isAuthorizated;

    @Input() public bankList = [];

    public moreBanks = false;

    constructor(
    ) { }

}
