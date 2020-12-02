import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSharesSnippetComponent } from './news-shares-snippet.component';
import { RouterModule } from '@angular/router';
import { SharesDayPipe } from '../shares/shares-day.pipe';

@NgModule({
    declarations: [
        NewsSharesSnippetComponent,
        SharesDayPipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [
        NewsSharesSnippetComponent,
        SharesDayPipe
    ]
})
export class NewsSharesSnippetModule { }
