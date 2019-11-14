import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SearchOutputComponent } from './search-output.component';
import { SearchOutputPipe } from './search-output.pipe';
import { SearchBitNumberPipe } from './search-bit-number.pipe';
import { ModalApartamenModule } from '../modal-apartament/modal-apartament.module';

@NgModule({
    exports: [
        SearchBitNumberPipe,
        SearchOutputPipe,
        SearchOutputComponent
    ],
    declarations: [
        SearchOutputComponent,
        SearchBitNumberPipe,
        SearchOutputPipe
    ],
    providers: [],
    imports: [
        CommonModule,
        ModalApartamenModule
    ],
})
export class SearchOutputModule { }
