import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { AutoResizeTextareaModule } from '../UI/auto-resize-textarea/auto-resize-textarea.module';
import { GHMRangeNumberModule } from '../UI/ghm-range-number/ghm-range-number.module';
import { GHMTextAreaModule } from '../UI/ghm-textarea/ghm-textarea.module';
import { JkObjectsComponent } from './jk-objects.component';
import { JkObjectsListComponent } from './jk-objects-list/jk-objects-list.component';
import { JkObjectsItemComponent } from './jk-objects-item/jk-objects-item.component';
import { ObjectPreviewComponent } from './jk-objects-item/object-preview/object-preview.component';
import { ObjectFilterComponent } from './jk-objects-item/object-filter/object-filter.component';
import { ObjectTriggerComponent } from './jk-objects-item/object-trigger/object-trigger.component';
import { ObjectProjectComponent } from './jk-objects-item/object-project/object-project.component';
import { ObjectGalleryComponent } from './jk-objects-item/object-gallery/object-gallery.component';
import { ObjectDecorationComponent } from './jk-objects-item/object-decoration/object-decoration.component';
import { ObjectDocumentationComponent } from './jk-objects-item/object-documentation/object-documentation.component';
import { ObjectProjectsComponent } from './jk-objects-item/object-projects/object-projects.component';
import { ObjectNewsModule } from './jk-objects-item/object-news/object-news.module';
import { ObjectLocationModule } from './jk-objects-item/object-location/object-location.module';
import { ObjectPurchaseModule } from './jk-objects-item/object-purchase/object-purchase.module';
import { ObjectMembersModule } from './jk-objects-item/object-members/object-members.module';
import { JkObjectsListModule } from './jk-objects-list/jk-objects-list.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ObjectFlatsModule } from './jk-objects-item/object-flat/object-flats.module';
import { ObjectDynamicModule } from './jk-objects-item/object-dynamic/object-dynamic.module';
import { ObjectDynamicComponent } from './jk-objects-item/object-dynamic/object-dynamic.component';
import { NavMenuModule } from '../UI/nav-menu/nav-menu.module';
import { ObjectStorageComponent } from './jk-objects-item/object-storage/object-storage.component';

const jkObjectsComponents = [
    JkObjectsComponent,
    JkObjectsItemComponent,
    ObjectPreviewComponent,
    ObjectFilterComponent,
    ObjectTriggerComponent,
    ObjectProjectComponent,
    ObjectGalleryComponent,
    ObjectDecorationComponent,
    ObjectDocumentationComponent,
    ObjectProjectsComponent,
    ObjectStorageComponent
];

@NgModule({
    exports: [
        ...jkObjectsComponents
    ],
    declarations: [
        ...jkObjectsComponents
    ],
    imports: [
        SlideTopLabelModule,
        AutoResizeTextareaModule,
        GHMRangeNumberModule,
        GHMTextAreaModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        ObjectNewsModule,
        ObjectLocationModule,
        ObjectPurchaseModule,
        ObjectMembersModule,
        ObjectFlatsModule,
        ObjectDynamicModule,

        JkObjectsListModule,
        TextMaskModule,
        NavMenuModule,

        RouterModule.forChild([
            {
                path: '', component: JkObjectsComponent
                , children: [
                    {path: 'list', component: JkObjectsListComponent},
                    {path: 'list/:id', component: JkObjectsItemComponent},
                    {path: 'list/:id/dynamic/:year/:month', component: ObjectDynamicComponent}
                ]
            }
        ])
    ]
})
export class JkObjectsModule {
}
