import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PartnersComponent } from './partners.component';
import { NgModule } from '@angular/core';
import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoResizeTextareaModule } from '../UI/auto-resize-textarea/auto-resize-textarea.module';
import { NavMenuModule } from '../UI/nav-menu/nav-menu.module';

const partnersComponents = [
    PartnersComponent,
];

@NgModule({
    exports: [
        ...partnersComponents
    ],
    declarations: [
        ...partnersComponents
    ],
    imports: [
        CommonModule,
        SlideTopLabelModule,
        AutoResizeTextareaModule,
        ReactiveFormsModule,
        NavMenuModule,
        RouterModule.forChild([
            { path: '', component: PartnersComponent }
        ])
    ]
})

export class PartnersModule {}
