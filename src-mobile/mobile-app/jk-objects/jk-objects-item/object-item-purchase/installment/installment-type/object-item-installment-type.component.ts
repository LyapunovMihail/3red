import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-object-item-installment-type',
    templateUrl: 'object-item-installment-type.component.html',
    styleUrls: ['object-item-installment-type.component.scss']
})

export class ObjectItemInstallmentTypeComponent {

    @Output() public typeChanges = new EventEmitter<string>();

    public showTypeInstallment = false;

    public typeOne = 'Бесплатная рассрочка';
    public typeTwo = 'Платная рассрочка';
    public typeThree = '100% оплата';

    public changeType = this.typeOne;

    constructor() { }

    public acceptChange() {
        this.typeChanges.emit(this.changeType);
        this.showTypeInstallment = !this.showTypeInstallment;
    }
}