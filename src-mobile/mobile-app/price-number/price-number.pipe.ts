import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe({
  name: 'priceNumber'
})
export class PriceNumberPipe implements PipeTransform {

  transform(value: number): string {
    return String(value).replace(/(\d)(?=(\d{3})+([^\d]|$))/g, '$1 ');
  }
}
