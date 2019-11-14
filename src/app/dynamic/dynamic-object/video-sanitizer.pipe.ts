import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'videoSanitizerPipe'
})

export class VideoSanitizerPipe implements PipeTransform  {

   constructor(private _sanitizer: DomSanitizer) { }

   transform(url: string): SafeHtml {
      return this._sanitizer.bypassSecurityTrustResourceUrl(url.replace('watch?v=', 'embed/'));
   }
}
