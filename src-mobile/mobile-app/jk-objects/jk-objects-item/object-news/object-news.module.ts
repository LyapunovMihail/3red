import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectNewsComponent } from './object-news.component';
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
        NavMenuModule,
        NewsSharesSnippetModule
    ]
})
export class ObjectNewsModule {
}
