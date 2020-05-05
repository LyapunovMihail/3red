import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { NgModule } from '@angular/core';
import { HomePreviewComponent } from './preview/home-preview.component';
import { HomeService } from './home.service';
import { SharesDayPipe } from './preview/shares-day.pipe';
import { LineBreakPipe } from './line-break.pipe';
import { HomePreviewAdminComponent } from './preview/home-preview-admin/home-preview-admin.component';
import { AdminModalModule } from '../admin-modal/admin-modal.module';
import { AutoResizeTextareaModule } from '../UI/auto-resize-textarea/auto-resize-textarea.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { HomeFilterModule } from './filter/home-filter.module';
import { JkObjectsListModule } from '../jk-objects/jk-objects-list/jk-objects-list.module';
import { HomeNewsModule } from './news/home-news.module';
import { HomeInfoComponent } from './home/home-info.component';
import { HomeInfoAdminComponent } from './home/home-info-admin/home-info-admin.component';

@NgModule({
    exports: [
        HomeComponent
    ],
    declarations: [
        HomeComponent,
        HomePreviewComponent,
        HomePreviewAdminComponent,
        HomeInfoComponent,
        HomeInfoAdminComponent,
        SharesDayPipe,
        LineBreakPipe
    ],
    imports: [
        CommonModule,
        AdminModalModule,
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
