import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ObjectsItemsComponent } from './objects-items/objects-items.component';
import { JkObjectsListComponent } from './jk-objects-list.component';
import { ObjectsMapComponent } from './objects-map/objects-map.component';
import { ObjectsAdminComponent } from './objects-admin/objects-admin.component';
import { AdminModalModule } from '../../admin-modal/admin-modal.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SlideTopLabelModule } from '../../UI/slide-top-label/slide-top-label.module';
import { RouterModule } from '@angular/router';
import { CheckboxListComponent } from './objects-form/checkbox-list/checkbox-list.component';
import { JkObjectsNumberPipe } from './jk-objects-number.pipe';
import { ObjectsFormComponent } from './objects-form/objects-form.component';
import { NavMenuModule } from '../../UI/nav-menu/nav-menu.module';
import { DragNDropJkDirective } from './objects-items/drag-n-drop-jk.directive';

@NgModule({
  exports: [
      JkObjectsListComponent,
      ObjectsItemsComponent,
      DragNDropJkDirective,
      ObjectsMapComponent,
      ObjectsAdminComponent,
      CheckboxListComponent,
      JkObjectsNumberPipe,
      ObjectsFormComponent
  ],
  declarations: [
      JkObjectsListComponent,
      ObjectsItemsComponent,
      DragNDropJkDirective,
      ObjectsMapComponent,
      ObjectsAdminComponent,
      CheckboxListComponent,
      JkObjectsNumberPipe,
      ObjectsFormComponent,
  ],
  imports: [
      CommonModule,
      RouterModule,
      ReactiveFormsModule,
      AdminModalModule,
      SlideTopLabelModule,
      NavMenuModule

  ]
})

export class JkObjectsListModule { }
