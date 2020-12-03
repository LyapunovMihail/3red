import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeNewsComponent } from './home-news.component';
import { RouterModule } from '@angular/router';
import { NavMenuModule } from '../../UI/nav-menu/nav-menu.module';
import { NewsSharesSnippetModule } from '../../news-shares/news-shares-snippet/news-shares-snippet.module';

@NgModule({
    exports: [
        HomeNewsComponent
    ],
    declarations: [
        HomeNewsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NavMenuModule,
        NewsSharesSnippetModule,
    ]
})
export class HomeNewsModule {
}
