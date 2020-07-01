import { AboutFunctionsComponent } from './functions/about-functions.component';
import { AboutCareerComponent } from './career/about-career.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';
import { NgModule } from '@angular/core';
import { GHMTextAreaModule } from './../UI/ghm-textarea/ghm-textarea.module';
import { AboutStageComponent } from './stage/about-stage.component';
import { AboutProductComponent } from './product/about-product.component';
import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeNewsModule } from '../home/news/home-news.module';
import { AboutDocumentationComponent } from './docs/about-documentation.component';
import { TextMaskModule } from 'angular2-text-mask';
import { AboutTeamComponent } from './team/about-team.component';

const AboutComponents = [
    AboutComponent,
    AboutStageComponent,
    AboutProductComponent,
    AboutTeamComponent,
    AboutCareerComponent,
    AboutFunctionsComponent,
    AboutDocumentationComponent,
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
        SlideTopLabelModule,
        ReactiveFormsModule,
        HomeNewsModule,
        TextMaskModule,
        RouterModule.forChild([
            { path: '', component: AboutComponent }
        ])
    ]
})

export class AboutModule {}
