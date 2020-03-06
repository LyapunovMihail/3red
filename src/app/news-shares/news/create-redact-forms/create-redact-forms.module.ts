import { NewsCreateFormComponent } from './news-create-form/news-create-form.component';
import { NewsRedactFormComponent } from './news-redact-form/news-redact-form.component';
import { NewsDeleteFormComponent } from './news-delete-form/news-delete-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DatePickerModule } from '../../shares/shares-edit/date-picker/date-picker.module';
import { NewsEditTextComponent } from './news-edit-controls/news-edit-text/news-edit-text.component';
import { NewsEditImageComponent } from './news-edit-controls/news-edit-image/news-edit-image.component';
import { GHMTextAreaModule } from '../../../UI/ghm-textarea/ghm-textarea.module';
import { NewsEditImage2Component } from './news-edit-controls/news-edit-image2/news-edit-image2.component';
import { NewsEditAnchorComponent } from './news-edit-controls/news-edit-anchor/news-edit-anchor.component';

@NgModule({
    exports: [
        NewsCreateFormComponent,
        NewsRedactFormComponent,
        NewsDeleteFormComponent,
        NewsEditTextComponent,
        NewsEditImageComponent,
        NewsEditImage2Component,
        NewsEditAnchorComponent
    ],
    declarations: [
        NewsCreateFormComponent,
        NewsRedactFormComponent,
        NewsDeleteFormComponent,
        NewsEditTextComponent,
        NewsEditImageComponent,
        NewsEditImage2Component,
        NewsEditAnchorComponent
    ],
    imports: [
        FormsModule,
        GHMTextAreaModule,
        ReactiveFormsModule,
        DatePickerModule,
        CommonModule
    ]
})

export class CreateRedactFormsModule { }
