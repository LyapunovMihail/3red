import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'houseSVGSanitizePipe'
})

export class HouseSVGSanitizePipe implements PipeTransform  {

    constructor(private sanitizer: DomSanitizer) {}

    transform(v: any): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(v);
    }
}
