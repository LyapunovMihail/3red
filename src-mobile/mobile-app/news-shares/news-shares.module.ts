import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NewsSharesComponent } from './news-shares.component';
import { NewsSharesAllComponent } from './all/news-shares-all.component';
import { NewsModule } from './news/news.module';
import { SharesModule } from './shares/shares.module';
import { NavMenuModule } from '../UI/nav-menu/nav-menu.module';
import { NewsSharesSnippetModule } from './news-shares-snippet/news-shares-snippet.module';

@NgModule({
    exports: [
        NewsSharesComponent,
        NewsSharesAllComponent,
    ],
    declarations: [
        NewsSharesComponent,
        NewsSharesAllComponent,
    ],
    providers: [
    ],
    imports: [
        NewsModule,
        SharesModule,
        CommonModule,
        NavMenuModule,
        NewsSharesSnippetModule,
        RouterModule.forChild([
            { path: 'news-shares', component: NewsSharesComponent
                , children : [
                    { path: '', redirectTo: 'all', pathMatch: 'full'},
                    { path: 'all', component: NewsSharesAllComponent},
                    { path: 'news', loadChildren: () => import('./news/news.module').then(m => m.NewsModule)},
                    { path: 'shares', loadChildren: () => import('./shares/shares.module').then(m => m.SharesModule)},
                ]
            }
        ])
    ]
})

export class NewsSharesModule {
}
