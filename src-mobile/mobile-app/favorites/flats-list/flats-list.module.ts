import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatsListComponent } from './flats-list.component';
import { ApartmentModule } from '../../flats/apartment/apartment.module';
import { BitNumberPipe } from './bit-number.pipe';
import { FlatSnippetModule } from '../../flats/flat-snippet/flat-snippet.module';

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
        ApartmentModule,
        FlatSnippetModule
    ]
})
export class FlatsListModule {
}
