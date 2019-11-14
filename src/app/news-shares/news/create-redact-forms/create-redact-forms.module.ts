import { NewsCreateFormComponent } from './news-create-form/news-create-form.component';
import { NewsRedactFormComponent } from './news-redact-form/news-redact-form.component';
import { NewsDeleteFormComponent } from './news-delete-form/news-delete-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

@NgModule({
    exports: [
        NewsCreateFormComponent,
        NewsRedactFormComponent,
        NewsDeleteFormComponent
    ],
    declarations: [
        NewsCreateFormComponent,
        NewsRedactFormComponent,
        NewsDeleteFormComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ]
})

export class CreateRedactFormsModule { }
