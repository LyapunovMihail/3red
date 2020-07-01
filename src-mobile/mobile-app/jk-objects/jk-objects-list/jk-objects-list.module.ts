import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsItemsComponent } from './objects-items/objects-items.component';
import { JkObjectsListComponent } from './jk-objects-list.component';
import { ObjectsMapComponent } from './objects-map/objects-map.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../../UI/slide-top-label/slide-top-label.module';
import { RouterModule } from '@angular/router';
import { CheckboxListComponent } from './objects-form/checkbox-list/checkbox-list.component';
import { JkObjectsNumberPipe } from './jk-objects-number.pipe';
import { ObjectsFormComponent } from './objects-form/objects-form.component';
import { GHMRangeNumberModule } from '../../UI/ghm-range-number/ghm-range-number.module';
import { SearchFormPipe } from './objects-form/search-form.pipe';

@NgModule({
  exports: [
      JkObjectsListComponent,
      ObjectsItemsComponent,
      ObjectsMapComponent,
      CheckboxListComponent,
      JkObjectsNumberPipe,
      SearchFormPipe,
      ObjectsFormComponent
  ],
  declarations: [
      JkObjectsListComponent,
      ObjectsItemsComponent,
      ObjectsMapComponent,
      CheckboxListComponent,
      JkObjectsNumberPipe,
      SearchFormPipe,
      ObjectsFormComponent
  ],
  imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      SlideTopLabelModule,
      GHMRangeNumberModule
  ]
})

export class JkObjectsListModule { }
