import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'bitNumber'
})

export class BitNumberPipe implements PipeTransform  {

   constructor(private _sanitizer: DomSanitizer) {}

   transform(v: any): SafeHtml {
        if (String(v) && String(v).length > 0) {
            return String(v).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        } else {
            return v;
        }
   }
}
