import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModalApartamentComponent } from './modal-apartament.component';
import { ApartamentBitNumberPipe } from './apartament-bit-number.pipe';
import { FormsRequestModule } from '../../forms-request/forms-request.module';

@NgModule({
    exports: [
        ModalApartamentComponent
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
