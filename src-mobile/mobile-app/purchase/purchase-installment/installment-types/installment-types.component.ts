import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-installment-types',
    templateUrl: './installment-types.component.html',
    styleUrls: ['./installment-types.component.scss']
})

export class InstallmentTypesComponent {

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
