import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatsListComponent } from './flats-list.component';
import { ApartmentModule } from '../../flats/apartment/apartment.module';
import { BitNumberPipe } from './bit-number.pipe';

@NgModule({
    exports: [
        FlatsListComponent,
        BitNumberPipe
    ],
    declarations: [
        FlatsListComponent,
        BitNumberPipe
    ],
    imports: [
        CommonModule,
        ApartmentModule
    ]
})
export class FlatsListModule {
}
