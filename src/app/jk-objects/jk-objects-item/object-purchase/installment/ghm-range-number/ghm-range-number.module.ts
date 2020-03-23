import { GHMNumberPipe } from './ghm-number.pipe';
import { CommonModule } from '@angular/common';
import { GHMRangetNumberComponent } from './ghm-range-number.component';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [
        GHMRangetNumberComponent,
        GHMNumberPipe
    ],
    declarations: [
        GHMRangetNumberComponent,
        GHMNumberPipe
    ],
    imports: [
        CommonModule
    ]
})

export class GHMRangetNumberModule { }