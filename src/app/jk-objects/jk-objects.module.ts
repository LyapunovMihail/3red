import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { JkObjectsComponent } from './jk-objects.component';
import { JkObjectsListComponent } from './jk-objects-list/jk-objects-list.component';
import { JkObjectsItemComponent } from './jk-objects-item/jk-objects-item.component';
import { ObjectItemPreviewComponent } from './jk-objects-item/object-item-preview/object-item-preview.component';
import { ObjectItemFilterComponent } from './jk-objects-item/object-item-filter/object-item-filter.component';
import { GHMRangeNumberModule } from '../flats/search/search-form/ghm-range-number/ghm-range-number.module';
import { GHMRangeNumberComponent } from '../flats/search/search-form/ghm-range-number/ghm-range-number.component';
import { ObjectItemTriggerComponent } from './jk-objects-item/object-item-trigger/object-item-trigger.component';
import { ObjectItemStorageComponent } from './jk-objects-item/object-item-storage/object-item-storage.component';
import { ObjectItemBuilderComponent } from './jk-objects-item/object-item-builder/object-item-builder.component';
import { ObjectItemFlatComponent } from './jk-objects-item/object-item-flat/object-item-flat.component';
import { ObjectItemGalleryComponent } from './jk-objects-item/object-item-gallery/object-item-gallery.component';
import { ObjectItemDecorationComponent } from './jk-objects-item/object-item-decoration/object-item-decoration.component';
import { ObjectItemLocationComponent } from './jk-objects-item/object-item-location/object-item-location.component';
import { ObjectItemPurchaseComponent } from './jk-objects-item/object-item-purchase/object-item-purchase.component';
import { ObjectItemNewsComponent } from './jk-objects-item/object-item-news/object-item-news.component';
import { ObjectItemDocumentationComponent } from './jk-objects-item/object-item-documentation/object-item-documentation.component';
import { ObjectItemMembersComponent } from './jk-objects-item/object-item-members/object-item-members';
import { ObjectItemProjectComponent } from './jk-objects-item/object-item-project/object-item-project.component';
import { ObjectItemInstallmentComponent } from './jk-objects-item/object-item-purchase/installment/object-item-installment.component';
import { ObjectPurchaseInstallmentNumberPipe } from './jk-objects-item/object-item-purchase/installment/object-item-installment.pipe';
import { ObjectPurchaseInstallmentService } from './jk-objects-item/object-item-purchase/installment/object-item-installment.service';

const JkObjectsComponents = [
  JkObjectsComponent,
  JkObjectsListComponent,
  JkObjectsItemComponent,
  ObjectItemPreviewComponent,
  ObjectItemFilterComponent,
  ObjectItemTriggerComponent,
  ObjectItemStorageComponent,
  ObjectItemBuilderComponent,
  ObjectItemFlatComponent,
  ObjectItemGalleryComponent,
  ObjectItemDecorationComponent,
  ObjectItemLocationComponent,
  ObjectItemPurchaseComponent,
  ObjectItemNewsComponent,
  ObjectItemDocumentationComponent,
  ObjectItemMembersComponent,
  ObjectItemProjectComponent,
  ObjectItemInstallmentComponent,
  ObjectPurchaseInstallmentNumberPipe
];

@NgModule({
  exports: [
    ...JkObjectsComponents,
    GHMRangeNumberComponent
  ],
  declarations: [...JkObjectsComponents],
  imports: [
    CommonModule,
    GHMRangeNumberModule,
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
    ObjectPurchaseInstallmentNumberPipe,
    ObjectPurchaseInstallmentService
  ]
})
export class JkObjectsModule { }
