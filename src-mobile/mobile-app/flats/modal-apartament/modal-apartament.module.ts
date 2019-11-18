import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalApartamentComponent } from './modal-apartament.component';
import { ApartamentBitNumberPipe } from './apartament-bit-number.pipe';
import { FormsRequestModule } from '../../forms-request/forms-request.module';
import { FormReserveComponent } from '../../forms-request/form-reserve/form-reserve.component';
import { FormCreditComponent } from '../../forms-request/form-credit/form-credit.component';

@NgModule({
    exports: [
        ModalApartamentComponent,
        FormReserveComponent,
        FormCreditComponent,
    ],
    declarations: [
        ModalApartamentComponent,
        ApartamentBitNumberPipe
    ],
    providers: [],
    imports: [
        CommonModule,
        FormsRequestModule
    ],
})
export class ModalApartamenModule { }
