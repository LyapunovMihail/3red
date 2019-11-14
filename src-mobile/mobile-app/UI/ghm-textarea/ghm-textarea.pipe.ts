import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'ghmTextAreaPipe'
})

export class GHMTextAreaPipe implements PipeTransform  {

    constructor(private _sanitizer: DomSanitizer) { }

    public transform(html: string): SafeHtml {
        html = (typeof html === 'string') ? html : '';
        return this._sanitizer.bypassSecurityTrustHtml(html.replace(/(?:\r\n|\r|\n)/g, '<br />'));
    }
}