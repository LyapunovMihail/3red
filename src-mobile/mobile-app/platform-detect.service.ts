import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export class PlatformDetectService {

    isBrowser = false;

    constructor( @Inject(PLATFORM_ID) private platformId: Object ) {
        this.isBrowser = (isPlatformBrowser(this.platformId)) ? true : false ;
    }
}
