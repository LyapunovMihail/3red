import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
    name: 'locationRoutesPipe'
})

export class LocationRoutesPipe implements PipeTransform  {

   constructor(private _sanitizer: DomSanitizer){}

    transform(v: any) {
        return v.filter( item => ('route' in item.config )).filter( item => item.config.type == 'bus')
    }
}
