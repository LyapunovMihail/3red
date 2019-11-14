import { Injectable } from '@angular/core';

export interface FormParams {
    price: {
        val: any;
        min: any;
        max: any;
    };
    firstpay: {
        val: any;
        min: any;
        max: any;
    };
    month: {
        val: any;
        min: any;
        max: any;
    };
}


@Injectable()

export class PurchaseInstallmentService {

    constructor ( ) { }

    public values( form: FormParams ): FormParams {
        let values: FormParams = {price: {val: '', min: '', max: ''}, firstpay: {val: '', min: '', max: ''}, month: {val: '', min: '', max: ''}} ;
        // all form key's values parse to number
        for ( let i in form ) {
            values[i] = form[i];
            for ( let j in form[i] ) {
                values[i][j] = this.toNumber(form[i][j]);
            }
        }
        return values;
    }

    public toNumber(val) {
        if (String(val) && String(val).length > 0) {
            return Number(String(val).replace(/[^0-9]/gim, ''));
        } else {
            return val;
        }
    }

    public getPercent(months) {
        if (months < 7 ) {
            return 0;
        } else if (months >= 7 && months <= 9) {
            return 6;
        } else if (months >= 10 && months <= 12) {
            return 7;
        } else if (months >= 13 && months <= 15) {
            return 8;
        } else if (months >= 16 && months <= 18) {
            return 9;
        } else if (months >= 19 && months <= 21) {
            return 10;
        } else { return 11; }
    }
}
