import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateRedactFormsModule } from './news/create-redact-forms/create-redact-forms.module';
import { RouterModule } from '@angular/router';
import { NewsSharesComponent } from './news-shares.component';
import { NewsSharesAllComponent } from './all/news-shares-all.component';
import { NewsModule } from './news/news.module';
import { SharesModule } from './shares/shares.module';
import { SharesEditFormsModule } from './shares/shares-edit/shares-edit-forms.module';
import { NewsSharesAllItemsComponent } from './all/news-shares-all-items/news-shares-all-items.component';
import { NavMenuModule } from '../UI/nav-menu/nav-menu.module';
import { NewsSharesSnippetModule } from './news-shares-snippet/news-shares-snippet.module';

@NgModule({
    exports: [
        NewsSharesComponent,
        NewsSharesAllComponent,
        NewsSharesAllItemsComponent
    ],
    declarations: [
        NewsSharesComponent,
        NewsSharesAllComponent,
        NewsSharesAllItemsComponent
    ],
    providers: [
    ],
    imports: [
        NewsModule,
        SharesModule,
        CommonModule,
        CreateRedactFormsModule,
        SharesEditFormsModule,
        NewsSharesSnippetModule,
        NavMenuModule,
        RouterModule.forChild([
            { path: 'news-shares', component: NewsSharesComponent
                , children : [
                    { path: '', redirectTo: 'all', pathMatch: 'full'},
                    { path: 'all', component: NewsSharesAllComponent},
                    { path: 'news', loadChildren: './news/news.module#NewsModule'},
                    { path: 'shares', loadChildren: './shares/shares.module#SharesModule'},
                ]
            }
        ])
    ]
})

export class NewsSharesModule {
}
