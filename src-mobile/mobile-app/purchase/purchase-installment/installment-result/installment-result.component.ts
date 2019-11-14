import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-installment-result',
  templateUrl: './installment-result.component.html',
  styleUrls: ['./installment-result.component.scss']
})
export class InstallmentResultComponent {

    @Input() public percent = 0;
    @Input() public monthPay = 0;

    public typeOne = 'Бесплатная рассрочка';
    public typeTwo = 'Платная рассрочка';
    public typeThree = '100% оплата';
    @Input() public changeType = this.typeOne;

    @Input() public price: number;

    constructor() { }

    public saleFullPay(num) {
        const sale = num / 100 * 3;
        return sale;
    }
}
