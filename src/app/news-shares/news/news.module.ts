import { LineBreakPipe } from './line-break.pipe';
import { NewsService } from './news.service';
import { NewsListComponent } from './news-list/news-list.component';
import { CreateRedactFormsModule } from './create-redact-forms/create-redact-forms.module';
import { NewsViewComponent } from './news-view/news-view.component';
import { NewsComponent } from './news.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NavMenuModule } from '../../UI/nav-menu/nav-menu.module';
import { NewsSharesSnippetModule } from '../news-shares-snippet/news-shares-snippet.module';

const NewsComponents = [
    NewsComponent,
    LineBreakPipe,
    NewsViewComponent,
    NewsListComponent,
];

@NgModule({
    exports: [
        ...NewsComponents
    ],
    declarations: [
        ...NewsComponents
    ],
    providers: [
        NewsService
    ],
    imports: [
        CommonModule,
        CreateRedactFormsModule,
        NewsSharesSnippetModule,
        NavMenuModule,
        RouterModule.forChild([
            { path: '', component: NewsComponent
                , children : [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: NewsListComponent },
                    { path: 'list/:id', component: NewsViewComponent }
                ]
            }
        ])
    ]
})

export class NewsModule { }
