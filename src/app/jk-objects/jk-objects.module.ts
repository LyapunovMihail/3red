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
import { ObjectGalleryComponent } from './jk-objects-item/object-gallery/object-gallery.component';
import { ObjectDecorationComponent } from './jk-objects-item/object-decoration/object-decoration.component';
import { ObjectDocumentationComponent } from './jk-objects-item/object-documentation/object-documentation.component';
import { ObjectProjectsComponent } from './jk-objects-item/object-projects/object-projects.component';
import { ObjectPreviewAdminComponent } from './jk-objects-item/object-preview/object-preview-admin/object-preview-admin.component';
import { ObjectProjectAdminComponent } from './jk-objects-item/object-project/object-project-admin/object-project-admin.component';
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
import { TextMaskModule } from 'angular2-text-mask';
import { ObjectFlatsModule } from './jk-objects-item/object-flat/object-flats.module';
import { ObjectFlatsComponent } from './jk-objects-item/object-flat/object-flats.component';
import { HouseComponent } from './jk-objects-item/object-flat/house/house.component';
import { FloorComponent } from './jk-objects-item/object-flat/floor/floor.component';
import { ApartmentComponent } from './jk-objects-item/object-flat/apartment/apartment.component';
import { ObjectDynamicModule } from './jk-objects-item/object-dynamic/object-dynamic.module';
import { ObjectDynamicComponent } from './jk-objects-item/object-dynamic/object-dynamic.component';
import { ObjectStorageListComponent } from './jk-objects-item/object-storage/storage/storage-list/object-storage.component';
import { ObjectParkingListComponent } from './jk-objects-item/object-storage/parking/parking-list/object-parking.component';
import { StorageModalComponent } from './jk-objects-item/object-storage/storage/storage-modal/storage-modal.component';
import { ObjectStorageSchemaComponent } from './jk-objects-item/object-storage/storage/storage-schema/object-storage-schema.component';
import { ParkingModalComponent } from './jk-objects-item/object-storage/parking/parking-modal/parking-modal.component';
import { ObjectParkingSchemaComponent } from './jk-objects-item/object-storage/parking/parking-schema/object-parking-schema.component';

const jkObjectsComponents = [
    JkObjectsComponent,
    JkObjectsItemComponent,
    ObjectPreviewComponent,
    ObjectFilterComponent,
    ObjectTriggerComponent,
    ObjectStorageComponent,
    ObjectProjectComponent,
    ObjectGalleryComponent,
    ObjectDecorationComponent,
    ObjectDocumentationComponent,
    ObjectProjectsComponent,
    ObjectPreviewAdminComponent,
    ObjectProjectAdminComponent,
    ObjectGalleryTabsAdminComponent,
    ObjectGalleryAdminComponent,
    ObjectDocumentationAdminComponent,
    ObjectDecorationTabsAdminComponent,
    ObjectDecorationAdminComponent,
    ObjectStorageListComponent,
    ObjectParkingListComponent,
    StorageModalComponent,
    ParkingModalComponent,
    ObjectStorageSchemaComponent,
    ObjectParkingSchemaComponent
];

@NgModule({
    exports: [
        ...jkObjectsComponents
    ],
    declarations: [
        ...jkObjectsComponents
    ],
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
        ObjectFlatsModule,
        ObjectDynamicModule,

        JkObjectsListModule,
        TextMaskModule,

        RouterModule.forChild([
            { path: '', component: JkObjectsComponent
                , children : [
                    { path: 'list', component: JkObjectsListComponent },
                    { path: 'list/:id', component: JkObjectsItemComponent },
                    { path: 'list/:id/flats', component: ObjectFlatsComponent,
                        children: [
                            { path: '', redirectTo: 'house/all', pathMatch: 'full' },
                            { path: 'house/:house', component: HouseComponent },
                            { path: 'house/:house/section/:section/floor/:floor', component: FloorComponent },
                            { path: 'house/:house/section/:section/floor/:floor/apartment/:apartment', component: ApartmentComponent }
                        ]
                    },
                    { path: 'list/:id/dynamic/:year/:month', component: ObjectDynamicComponent },
                    { path: 'list/:id/storage', component: ObjectStorageListComponent },
                    { path: 'list/:id/parking', component: ObjectParkingListComponent },
                    { path: 'list/:id/storage/:house/:section/:floor', component: ObjectStorageSchemaComponent },
                    { path: 'list/:id/parking/:house/:section/:floor', component: ObjectParkingSchemaComponent },
                ]
            }
        ])
    ]
})
export class JkObjectsModule { }
