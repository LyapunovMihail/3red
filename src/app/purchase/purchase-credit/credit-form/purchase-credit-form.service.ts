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
    deadline: {
        val: any;
        min: any;
        max: any;
    };
    // military: boolean;
    // maternal: boolean;
    // nationality: boolean;
}

@Injectable()

export class PurchaseCreditFormService {

    constructor() { }

    public values( form: FormParams ): FormParams {
        const values: FormParams = {price: {val: '', min: '', max: ''}, firstpay: {val: '', min: '', max: ''}, deadline: {val: '', min: '', max: ''}, /*military: false, maternal: false, nationality: false*/} ;
        // all form key's values parse to number
        for ( const i in form ) {
            values[i] = form[i];
            for ( const j in form[i] ) {
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

}
