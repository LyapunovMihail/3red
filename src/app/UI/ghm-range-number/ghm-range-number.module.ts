import { GHMNumberPipe } from './ghm-number.pipe';
import { CommonModule } from '@angular/common';
import { GHMRangeNumberComponent } from './ghm-range-number.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [
        GHMRangeNumberComponent,
        GHMNumberPipe
    ],
    declarations: [
        GHMRangeNumberComponent,
        GHMNumberPipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})

export class GHMRangeNumberModule { }
