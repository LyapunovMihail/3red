import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'headerPipe'
})

export class HeaderPipe implements PipeTransform  {

   constructor(private _sanitizer: DomSanitizer) {}

   transform(v: any): SafeHtml {
        if (String(v) && String(v).length > 0) {
            return String(v).replace(/[^+0-9]/gim, '');
        } else {
            return v;
        }
   }
}
