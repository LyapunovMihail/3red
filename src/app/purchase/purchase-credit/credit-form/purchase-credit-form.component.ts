import { PurchaseCreditFormService } from './purchase-credit-form.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormParams } from './purchase-credit-form.service';

@Component({
    selector: 'app-purchase-credit-form',
    templateUrl: './purchase-credit-form.component.html',
    styleUrls: ['./purchase-credit-form.component.scss'],
    providers: [ PurchaseCreditFormService ]
})

export class PurchaseCreditFormComponent implements OnInit {

    public form: FormParams = {
        price: {
            val : 2000000,
            min : 2000000,
            max : 10000000
        },
        firstpay: {
            val : 0,
            min : 0,
            max : 0
        },
        deadline: {
            val : 1,
            min : 1,
            max : 30
        },
        // maternal: false,
        // military: false,
        // nationality: false
    };

    @Input() public isAuthorizated;

    @Output() public formChange: EventEmitter<any> = new EventEmitter();

    constructor(
        private creditFormService: PurchaseCreditFormService
    ) { }

    public ngOnInit( ) {
        this.formConvert();
        this.formChange.emit(this.form);
    }

    public formConvert() {
        const values = this.creditFormService.values(this.form);

        // price
        if ( values.price.val < values.price.min ) {
            this.form.price.val = values.price.min;
        } else {
            this.form.price.val = values.price.val;
        }
        if (values.price.val > values.price.max) {
            this.form.price.val = values.price.max;
        }

        // firstpay
        this.form.firstpay.min = 0;
        this.form.firstpay.max = values.price.val;
        if (this.form.firstpay.val > this.form.price.val) {
            this.form.firstpay.val = this.form.price.val;
        }
        if (values.firstpay.val === '') {
            values.firstpay.val = 0;
        }

        // deadline
        if (values.deadline.val < values.deadline.min) {
            this.form.deadline.val = values.deadline.min;
        } else {
            this.form.deadline.val = values.deadline.val;
        }
        if (values.deadline.val > values.deadline.max) {
            this.form.deadline.val = values.deadline.max;
        }

    }

    public formChanges( val, field ) {
        if (this.form[field].val !== undefined) {
            this.form[field].val = val;
        } else {
            this.form[field] = val;
        }

        this.formConvert();
        this.formChange.emit(this.form);
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

}
