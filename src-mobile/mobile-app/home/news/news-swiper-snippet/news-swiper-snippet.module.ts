import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsSwiperSnippetComponent } from './news-swiper-snippet.component';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [NewsSwiperSnippetComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [NewsSwiperSnippetComponent]
})
export class NewsSwiperSnippetModule {
}
