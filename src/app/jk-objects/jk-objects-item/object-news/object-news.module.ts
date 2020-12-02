import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectNewsComponent } from './object-news.component';
import { SharesEditFormsModule } from '../../../news-shares/shares/shares-edit/shares-edit-forms.module';
import { CreateRedactFormsModule } from '../../../news-shares/news/create-redact-forms/create-redact-forms.module';
import { RouterModule } from '@angular/router';
import { NavMenuModule } from '../../../UI/nav-menu/nav-menu.module';
import { NewsSharesSnippetModule } from '../../../news-shares/news-shares-snippet/news-shares-snippet.module';

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
        NewsSharesSnippetModule,
        NavMenuModule
    ]
})
export class ObjectNewsModule {
}
