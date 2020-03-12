import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectNewsComponent } from './object-news.component';
import { SharesEditFormsModule } from '../../../news-shares/shares/shares-edit/shares-edit-forms.module';
import { CreateRedactFormsModule } from '../../../news-shares/news/create-redact-forms/create-redact-forms.module';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [
        ObjectNewsComponent
    ],
    declarations: [
        ObjectNewsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        SharesEditFormsModule,
        CreateRedactFormsModule,
    ]
})
export class ObjectNewsModule {
}
