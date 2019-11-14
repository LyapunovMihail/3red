import { GHMTextAreaPipe } from './ghm-textarea.pipe';
import { GHMTextAreaComponent } from './ghm-textarea.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        GHMTextAreaComponent,
        GHMTextAreaPipe
    ],
    exports: [
        GHMTextAreaComponent
    ],
    imports: [
        FormsModule
    ]
})

export class GHMTextAreaModule {}