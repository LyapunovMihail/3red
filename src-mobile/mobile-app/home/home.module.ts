import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { HomePreviewComponent } from './preview/home-preview.component';
import { HomeService } from './home.service';
import { SharesDayPipe } from './preview/shares-day.pipe';
import { LineBreakPipe } from './line-break.pipe';
import { AutoResizeTextareaModule } from '../UI/auto-resize-textarea/auto-resize-textarea.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { HomeFilterModule } from './filter/home-filter.module';
import { JkObjectsListModule } from '../jk-objects/jk-objects-list/jk-objects-list.module';
import { HomeNewsModule } from './news/home-news.module';
import { HomeInfoComponent } from './info/home-info.component';
// import { HomeIlikeComponent } from './ilike/home-ilike.component';

@NgModule({
    exports: [
        HomeComponent
    ],
    declarations: [
        HomeComponent,
        HomePreviewComponent,
        HomeInfoComponent,
        // HomeIlikeComponent,
        SharesDayPipe,
        LineBreakPipe
    ],
    imports: [
        CommonModule,
        AutoResizeTextareaModule,
        ReactiveFormsModule,
        SlideTopLabelModule,
        HomeFilterModule,
        JkObjectsListModule,
        HomeNewsModule,
        RouterModule.forChild([
            {path: '', component: HomeComponent, pathMatch: 'full'}
        ])
    ],
    providers: [
        HomeService
    ]
})

export class HomeModule {

}
