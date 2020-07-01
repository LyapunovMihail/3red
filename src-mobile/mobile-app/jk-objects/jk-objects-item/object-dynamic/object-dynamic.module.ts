import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../../../UI/slide-top-label/slide-top-label.module';
import { ObjectDynamicComponent } from './object-dynamic.component';
import { ObjectDynamicSchemaComponent } from './object-dynamic-schema/object-dynamic-schema.component';
import { ObjectDynamicMonthSwitcherComponent } from './object-dynamic-month-switcher/object-dynamic-month-switcher.component';
import { ObjectDynamicGalleryComponent } from './object-dynamic-gallery/object-dynamic-gallery.component';
import { ObjectDynamicSlideshowComponent } from './object-dynamic-gallery/dynamic-gallery-slideshow/dynamic-gallery-slideshow.component';
import { ObjectDynamicDateComponent } from './object-dynamic-date/object-dynamic-date.component';
import { DynamicService } from './dynamic-admin-content.service';
import { GHMTextAreaModule } from '../../../UI/ghm-textarea/ghm-textarea.module';
import { RouterModule } from '@angular/router';

@NgModule({
    exports: [
        ObjectDynamicComponent,
        ObjectDynamicSchemaComponent,
        ObjectDynamicMonthSwitcherComponent,
        ObjectDynamicGalleryComponent,
        ObjectDynamicSlideshowComponent,
        ObjectDynamicDateComponent,
    ],
    declarations: [
        ObjectDynamicComponent,
        ObjectDynamicSchemaComponent,
        ObjectDynamicMonthSwitcherComponent,
        ObjectDynamicGalleryComponent,
        ObjectDynamicSlideshowComponent,
        ObjectDynamicDateComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        SlideTopLabelModule,
        GHMTextAreaModule,
        RouterModule
    ],
    providers: [
        DynamicService
    ]
})
export class ObjectDynamicModule {
}
