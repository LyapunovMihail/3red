import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable()
export class PlatformDetectService {

    isBrowser: boolean = false;

    constructor ( @Inject(PLATFORM_ID) private platformId: Object ) {

        this.isBrowser = (isPlatformBrowser(this.platformId)) ? true : false ;

    }
}
