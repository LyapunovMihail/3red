import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminModalComponent } from './admin-modal.component';

@NgModule({
  exports: [AdminModalComponent],
  declarations: [AdminModalComponent],
  imports: [
    CommonModule
  ]
})
export class AdminModalModule { }
