import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

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
  ObjectItemGalleryComponent
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
    RouterModule.forChild([
      { path: '', component: JkObjectsComponent
        , children : [
          { path: '', redirectTo: 'list', pathMatch: 'full' },
          { path: 'list', component: JkObjectsListComponent },
          { path: 'list/:id', component: JkObjectsItemComponent }
        ]
      }
    ])
  ]
})
export class JkObjectsModule { }
