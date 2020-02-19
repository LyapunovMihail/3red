import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AutoResizeTextareaDirective } from './auto-resize-textarea.directive';

@NgModule({
  exports: [AutoResizeTextareaDirective],
  declarations: [AutoResizeTextareaDirective],
  imports: [
    CommonModule
  ]
})
export class AutoResizeTextareaModule { }
