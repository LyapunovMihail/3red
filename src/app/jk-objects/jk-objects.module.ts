import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { JkObjectsComponent } from './jk-objects.component';
import { JkObjectsListComponent } from './jk-objects-list/jk-objects-list.component';
import { JkObjectsItemComponent } from './jk-objects-item/jk-objects-item.component';

const JkObjectsComponents = [
  JkObjectsComponent,
  JkObjectsListComponent,
  JkObjectsItemComponent
];

@NgModule({
  exports: [...JkObjectsComponents],
  declarations: [...JkObjectsComponents],
  imports: [
    CommonModule,
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
