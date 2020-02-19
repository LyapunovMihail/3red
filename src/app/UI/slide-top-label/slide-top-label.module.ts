import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SlideTopLabelDirective } from './slide-top-label.directive';

@NgModule({
  exports: [SlideTopLabelDirective],
  declarations: [SlideTopLabelDirective],
  imports: [
    CommonModule
  ]
})
export class SlideTopLabelModule { }
