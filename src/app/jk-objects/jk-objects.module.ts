import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminModalModule } from '../admin-modal/admin-modal.module';
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
import { ObjectStorageComponent } from './jk-objects-item/object-storage/object-storage.component';
import { ObjectProjectComponent } from './jk-objects-item/object-project/object-project.component';
import { ObjectFlatComponent } from './jk-objects-item/object-flat/object-flat.component';
import { ObjectGalleryComponent } from './jk-objects-item/object-gallery/object-gallery.component';
import { ObjectDecorationComponent } from './jk-objects-item/object-decoration/object-decoration.component';
import { ObjectDocumentationComponent } from './jk-objects-item/object-documentation/object-documentation.component';
import { ObjectProjectsComponent } from './jk-objects-item/object-projects/object-projects.component';
import { ObjectPreviewAdminComponent } from './jk-objects-item/object-preview/object-preview-admin/object-preview-admin.component';
import { ObjectProjectAdminComponent } from './jk-objects-item/object-project/object-project-admin/object-project-admin.component';
import { ObjectDynamicComponent } from './jk-objects-item/object-dynamic/object-dynamic.component';
import { ObjectDynamicDateComponent } from './jk-objects-item/object-dynamic/object-dynamic-date/object-dynamic-date.component';
import { ObjectDynamicGalleryComponent } from './jk-objects-item/object-dynamic/object-dynamic-gallery/object-dynamic-gallery.component';
import { ObjectDynamicSchemaComponent } from './jk-objects-item/object-dynamic/object-dynamic-schema/object-dynamic-schema.component';
import { ObjectDynamicSlideshowComponent } from './jk-objects-item/object-dynamic/object-dynamic-gallery/dynamic-gallery-slideshow/dynamic-gallery-slideshow.component';
import { ObjectDynamicMonthSwitcherComponent } from './jk-objects-item/object-dynamic/object-dynamic-month-switcher/object-dynamic-month-switcher.component';
import { DynamicAdminSettingsComponent } from './jk-objects-item/object-dynamic/object-dynamic-admin/dynamic-admin-settings/dynamic-admin-settings.component';
import { DynamicAdminContentComponent } from './jk-objects-item/object-dynamic/object-dynamic-admin/dynamic-admin-content/dynamic-admin-content.component';
import { ObjectGalleryTabsAdminComponent } from './jk-objects-item/object-gallery/object-gallery-tabs-admin/object-gallery-tabs-admin.component';
import { ObjectGalleryAdminComponent } from './jk-objects-item/object-gallery/object-gallery-content-admin/object-gallery-admin.component';
import { ObjectDocumentationAdminComponent } from './jk-objects-item/object-documentation/object-documentation-admin/object-documentation-admin.component';
import { ObjectDecorationTabsAdminComponent } from './jk-objects-item/object-decoration/object-decoration-tabs-admin/object-decoration-tabs-admin.component';
import { ObjectDecorationAdminComponent } from './jk-objects-item/object-decoration/object-decoration-content-admin/object-decoration-admin.component';
import { ObjectNewsModule } from './jk-objects-item/object-news/object-news.module';
import { ObjectLocationModule } from './jk-objects-item/object-location/object-location.module';
import { ObjectPurchaseModule } from './jk-objects-item/object-purchase/object-purchase.module';
import { ObjectMembersModule } from './jk-objects-item/object-members/object-members.module';
import { JkObjectsListModule } from './jk-objects-list/jk-objects-list.module';

const jkObjectsComponents = [
    JkObjectsComponent,
    JkObjectsItemComponent,
    ObjectPreviewComponent,
    ObjectFilterComponent,
    ObjectTriggerComponent,
    ObjectStorageComponent,
    ObjectProjectComponent,
    ObjectFlatComponent,
    ObjectGalleryComponent,
    ObjectDecorationComponent,
    ObjectDocumentationComponent,
    ObjectProjectsComponent,
    ObjectPreviewAdminComponent,
    ObjectProjectAdminComponent,
    ObjectDynamicComponent,
    ObjectDynamicDateComponent,
    ObjectDynamicGalleryComponent,
    ObjectDynamicSchemaComponent,
    ObjectDynamicSlideshowComponent,
    ObjectDynamicMonthSwitcherComponent,
    DynamicAdminSettingsComponent,
    DynamicAdminContentComponent,
    ObjectGalleryTabsAdminComponent,
    ObjectGalleryAdminComponent,
    ObjectDocumentationAdminComponent,
    ObjectDecorationTabsAdminComponent,
    ObjectDecorationAdminComponent
];

@NgModule({
    exports: [
        ...jkObjectsComponents
    ],
    declarations: [...jkObjectsComponents],
    imports: [
        AdminModalModule,
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
        JkObjectsListModule,

        RouterModule.forChild([
            { path: '', component: JkObjectsComponent
                , children : [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: JkObjectsListComponent },
                    { path: 'list/:id', component: JkObjectsItemComponent },
                    { path: 'list/:id/dynamic', component: ObjectDynamicComponent }
                ]
            }
        ])
    ]
})
export class JkObjectsModule { }
