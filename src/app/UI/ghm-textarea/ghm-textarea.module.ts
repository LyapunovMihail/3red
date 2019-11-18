import { GHMTextAreaPipe } from './ghm-textarea.pipe';
import { GHMTextAreaComponent } from './ghm-textarea.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        GHMTextAreaComponent,
        GHMTextAreaPipe
    ],
    exports: [
        GHMTextAreaComponent
    ],
    imports: [
        FormsModule,
        CommonModule
    ]
})

export class GHMTextAreaModule {}