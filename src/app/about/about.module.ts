import { AboutFunctionsComponent } from './functions/about-functions.component';
import { AboutCareerComponent } from './career/about-career.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { GHMTextAreaModule } from './../UI/ghm-textarea/ghm-textarea.module';
import { AboutStageComponent } from './stage/about-stage.component';
import { AboutProductComponent } from './product/about-product.component';
import { AboutCareerAdminComponent } from './career/career-admin/about-career-admin.component';
import { AdminModalModule } from '../admin-modal/admin-modal.module';
import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeNewsModule } from '../home/news/home-news.module';
import { AboutDocumentationAdminComponent } from './docs/about-documentation-admin/about-documentation-admin.component';
import { AboutDocumentationComponent } from './docs/about-documentation.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AboutTeamComponent } from './team/about-team.component';
import { AboutTeamTabsAdminComponent } from './team/about-team-tabs-admin/about-team-tabs-admin.component';
import { AboutTeamAdminComponent } from './team/about-team-content-admin/about-team-admin.component';
import { AutoResizeTextareaModule } from '../UI/auto-resize-textarea/auto-resize-textarea.module';

const AboutComponents = [
    AboutComponent,
    AboutStageComponent,
    AboutProductComponent,
    AboutTeamComponent,
    AboutTeamTabsAdminComponent,
    AboutTeamAdminComponent,
    AboutCareerComponent,
    AboutCareerAdminComponent,
    AboutFunctionsComponent,
    AboutDocumentationComponent,
    AboutDocumentationAdminComponent
];

@NgModule({
    exports: [
        ...AboutComponents
    ],
    declarations: [
        ...AboutComponents
    ],
    imports: [
        CommonModule,
        GHMTextAreaModule,
        AdminModalModule,
        SlideTopLabelModule,
        ReactiveFormsModule,
        AutoResizeTextareaModule,
        HomeNewsModule,
        TextMaskModule,
        RouterModule.forChild([
            { path: '', component: AboutComponent }
        ])
    ]
})

export class AboutModule {}
