import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AdminModalModule } from '../admin-modal/admin-modal.module';
import { SlideTopLabelModule } from '../UI/slide-top-label/slide-top-label.module';
import { AutoResizeTextareaModule } from '../UI/auto-resize-textarea/auto-resize-textarea.module';
import { GHMRangeNumberModule } from '../UI/ghm-range-number/ghm-range-number.module';
import { JkObjectsComponent } from './jk-objects.component';
import { JkObjectsListComponent } from './jk-objects-list/jk-objects-list.component';
import { JkObjectsItemComponent } from './jk-objects-item/jk-objects-item.component';
import { ObjectItemPreviewComponent } from './jk-objects-item/object-item-preview/object-item-preview.component';
import { ObjectItemFilterComponent } from './jk-objects-item/object-item-filter/object-item-filter.component';
import { ObjectItemTriggerComponent } from './jk-objects-item/object-item-trigger/object-item-trigger.component';
import { ObjectItemStorageComponent } from './jk-objects-item/object-item-storage/object-item-storage.component';
import { ObjectItemProjectComponent } from './jk-objects-item/object-item-project/object-item-project.component';
import { ObjectItemFlatComponent } from './jk-objects-item/object-item-flat/object-item-flat.component';
import { ObjectItemGalleryComponent } from './jk-objects-item/object-item-gallery/object-item-gallery.component';
import { ObjectItemDecorationComponent } from './jk-objects-item/object-item-decoration/object-item-decoration.component';
import { ObjectItemLocationComponent } from './jk-objects-item/object-item-location/object-item-location.component';
import { ObjectItemPurchaseComponent } from './jk-objects-item/object-item-purchase/object-item-purchase.component';
import { ObjectItemNewsComponent } from './jk-objects-item/object-item-news/object-item-news.component';
import { ObjectItemDocumentationComponent } from './jk-objects-item/object-item-documentation/object-item-documentation.component';
import { ObjectItemMembersComponent } from './jk-objects-item/object-item-members/object-item-members.component';
import { ObjectItemProjectsComponent } from './jk-objects-item/object-item-projects/object-item-projects.component';
import { ObjectItemInstallmentComponent } from './jk-objects-item/object-item-purchase/installment/object-item-installment.component';
import { ObjectPurchaseInstallmentNumberPipe } from './jk-objects-item/object-item-purchase/installment/object-item-installment.pipe';
import { ObjectPurchaseInstallmentService } from './jk-objects-item/object-item-purchase/installment/object-item-installment.service';
import { ObjectsItemPreviewAdminComponent } from './jk-objects-item/object-item-preview/objects-item-preview-admin/objects-item-preview-admin.component';
import { ObjectsItemProjectAdminComponent } from './jk-objects-item/object-item-project/objects-item-project-admin/objects-item-project-admin.component';


const jkObjectsComponents = [
    JkObjectsComponent,
    JkObjectsListComponent,
    JkObjectsItemComponent,
    ObjectItemPreviewComponent,
    ObjectItemFilterComponent,
    ObjectItemTriggerComponent,
    ObjectItemStorageComponent,
    ObjectItemProjectComponent,
    ObjectItemFlatComponent,
    ObjectItemGalleryComponent,
    ObjectItemDecorationComponent,
    ObjectItemLocationComponent,
    ObjectItemPurchaseComponent,
    ObjectItemNewsComponent,
    ObjectItemDocumentationComponent,
    ObjectItemMembersComponent,
    ObjectItemProjectsComponent,
    ObjectItemInstallmentComponent,
    ObjectPurchaseInstallmentNumberPipe,
    ObjectsItemPreviewAdminComponent,
    ObjectsItemProjectAdminComponent

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
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule.forChild([
            { path: '', component: JkObjectsComponent
                , children : [
                    { path: '', redirectTo: 'list', pathMatch: 'full' },
                    { path: 'list', component: JkObjectsListComponent },
                    { path: 'list/:id', component: JkObjectsItemComponent }
                ]
            }
        ])
    ],
    providers: [
        ObjectPurchaseInstallmentService
    ]
})
export class JkObjectsModule { }
