import {
  PriceNumberPipe
} from './price-number.pipe';
import {
  NgModule
} from '@angular/core';
import {
  CommonModule
} from '@angular/common';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [PriceNumberPipe],
  exports: [PriceNumberPipe]
})
export class PriceNumberModule {}
