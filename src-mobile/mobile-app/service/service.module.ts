import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ServiceComponent } from './service.component';
import { NgModule } from '@angular/core';
import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { ReactiveFormsModule } from '@angular/forms';
import { AutoResizeTextareaModule } from '../UI/auto-resize-textarea/auto-resize-textarea.module';

const serviceComponents = [
    ServiceComponent,
];

@NgModule({
    exports: [
        ...serviceComponents
    ],
    declarations: [
        ...serviceComponents
    ],
    imports: [
        CommonModule,
        SlideTopLabelModule,
        AutoResizeTextareaModule,
        ReactiveFormsModule,
        RouterModule.forChild([
            { path: '', component: ServiceComponent }
        ])
    ]
})

export class ServiceModule {}
