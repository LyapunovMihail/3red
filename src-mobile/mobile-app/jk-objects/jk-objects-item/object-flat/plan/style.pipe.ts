import { Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Pipe({
    name: 'stylePipe'
})

export class StylePipe implements PipeTransform  {

    constructor(private sanitizer: DomSanitizer) {}

    transform(v: any): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(v);
    }
}
