import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'ghmNumberPipe'
})

export class GHMNumberPipe implements PipeTransform  {

   constructor(private _sanitizer: DomSanitizer) {}

   toNumber ( val ) {
       if (String(val) && String(val).length > 0) {
            return Number(String(val).replace(/[^.0-9]/gim, ''));
        } else {
            return val;
        }
   }

   transform ( val: any ) : SafeHtml {
        if (String(val) && String(val).length > 0) {
            return String(this.toNumber(val)).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
        } else {
            return val;
        }
   }
}
