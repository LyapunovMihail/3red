import { MyPipesModule } from '../../pipes/my-pipes.module';
import { NewsViewComponent } from './news-view/news-view.component';
import { NewsListComponent } from './news-preview/news-list/news-list.component';
import { NewsService } from './news.service';
import { NewsPreviewComponent } from './news-preview/news-preview.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NewsComponent } from './news.component';
import { NgModule } from '@angular/core';

const NewsComponents = [
    NewsComponent,
    NewsPreviewComponent,
    NewsListComponent,
    NewsViewComponent
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
        MyPipesModule,
        CommonModule,
        RouterModule,
        RouterModule.forChild([
            { path: '', component: NewsComponent
                , children : [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: NewsPreviewComponent },
                    { path: 'list/:id', component: NewsViewComponent }
                ]
            }
        ])
    ]
})

export class NewsModule {}
