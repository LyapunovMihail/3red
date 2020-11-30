import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlatSnippetComponent } from './flat-snippet.component';
import { BitNumberPipe } from '../search-output/bit-number.pipe';

@NgModule({
    declarations: [
        FlatSnippetComponent,
        BitNumberPipe,
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        FlatSnippetComponent,
        BitNumberPipe,
    ]
})
export class FlatSnippetModule {
}
