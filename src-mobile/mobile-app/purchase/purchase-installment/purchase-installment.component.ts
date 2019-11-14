import { PurchaseInstallmentNumberPipe } from './purchase-installment.pipe';
import { PurchaseInstallmentService, FormParams } from './purchase-installment.service';
import { Component, OnInit } from '@angular/core';

@Component ({
    selector: 'app-purchase-installment',
    templateUrl: './purchase-installment.component.html',
    styleUrls: ['./../purchase.component.scss'],
    providers: [
        PurchaseInstallmentNumberPipe
    ]
})

export class PurchaseInstallmentComponent implements OnInit {

    public percent = 0;

    public monthPay = 0;

    public isFullPay = false;

    public typeOne = 'Бесплатная рассрочка';
    public typeTwo = 'Платная рассрочка';
    public typeThree = '100% оплата';
    public changeType = this.typeOne;

    public form: FormParams = {
        price: {
            val : 2000000,
            min : 2000000,
            max : 10000000
        },
        month: {
            val : 1,
            min : 1,
            max : 14
        },
        firstpay: {
            val : 0,
            min : 0,
            max : 0
        }
    };

    constructor(
        private bitNumber: PurchaseInstallmentNumberPipe,
        private srvc: PurchaseInstallmentService
    ) { }

    public ngOnInit( ) {
        this.formConvert ( );
    }

    public formConvert( ) {
        const values = this.srvc.values(this.form);

        if (this.changeType === this.typeTwo) {
            this.form.month.min = 7;
            this.form.month.max = 24;
            this.form.month.val <= this.form.month.min ? this.form.month.val = this.form.month.min : this.form.month.val = this.form.month.val;
        } else {
            this.form.month.val <= this.form.month.min ? this.form.month.val = this.form.month.min : this.form.month.val = this.form.month.val;
            this.form.month.min = 1;
            this.form.month.max >= 6 ? this.form.month.max = 6 : this.form.month.max = this.form.month.max;
        }

        // price
        if ( values.price.val < values.price.min ) {
            this.form.price.val = values.price.min;
        } else {
            this.form.price.val = values.price.val;
        }
        if (values.price.val > values.price.max) {
            this.form.price.val = values.price.max;
        }

        // firstpay rewrite values
        if ( values.firstpay.val <  values.price.val / 2 ) {
            this.form.firstpay.val = values.price.val / 2;
            this.isFullPay = false;
        } else if ( values.firstpay.val >= values.price.val ) {
            this.form.firstpay.val = values.price.val;
            this.isFullPay = true;
        } else {
            this.form.firstpay.val = values.firstpay.val;
            this.isFullPay = false;
        }
        this.form.firstpay.min = values.price.val / 2;
        this.form.firstpay.max = values.price.val;

        // month
        if (values.month.val < values.month.min) {
            this.form.month.val = values.month.min;
        } else {
            this.form.month.val = values.month.val;
        }
        if (values.month.val > values.month.max) {
            this.form.month.val = values.month.max;
        }

        this.percent = this.srvc.getPercent( values.month.val );

        this.monthPay = this.getEveryMonth().toFixed(0);
    }

    public getEveryMonth() {

        // оставшаяся сумма за вычетом скидки и первоначального взноса
        const leftSum = (this.form.price.val - this.form.firstpay.val);

        // ежемесячная оплата
        let monthPrice;
        if ( this.percent > 0 ) {
            monthPrice = this.excelPMT(this.percent / (100 * 12), this.form.month.val, leftSum);
        } else {
            monthPrice = leftSum / this.form.month.val;
        }

        return (monthPrice);

    }

    public formChanges( val, field ) {
        this.form[field].val = val;
        this.formConvert ( );
    }

    public fullPayChange() {
        this.isFullPay = !this.isFullPay;
        const values = this.srvc.values(this.form);
        if ( this.isFullPay ) {
            this.form.firstpay.val = values.price.val;
        } else {
            this.form.firstpay.val = values.price.val / 2;
        }
    }

    // Эксель функция ПЛТ
    public excelPMT(
        rate /*(ставка) – процентная ставка.*/,
        number_of_periods /*(число_платежей) – количество запланированных платежей.*/,
        present_value /*(текущий_размер_выплат) – текущий размер ежегодных выплат.) */ ) {
        return (present_value * rate) / (1 - Math.pow((1 + rate), -number_of_periods));
    }

    /// format input's values
    public bitReplace( val, field ) {
        this.form[field].val = val;
    }

    public keyUpReviuse(e) {
        let value = e.target.value;
        const rep = /[-\.;":'a-zA-Zа-яА-Я]/;
        if (rep.test(value)) {
            value = value.replace(rep, '');
            e.target.value = value;
        }
    }




    public firstpayPercent(payment, price) {
        const percentPayment = (payment / price) * 100;
        return percentPayment;
    }
}
