import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PLATFORM_ID, Inject, Injectable } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable ()

export class WindowScrollLocker {

    static isBlocked = false;
    static isFirst = false;
    static rememberScrollPosition = 0;

    constructor(
        @Inject(DOCUMENT) private document: any,
        @Inject(PLATFORM_ID) private platformId: Object
    ) {
        if ( isPlatformBrowser(this.platformId) && !WindowScrollLocker.isFirst ) {
            WindowScrollLocker.isFirst = true;
            fromEvent(window, 'scroll').pipe(debounceTime(50))
                .subscribe((e: any) => {
                    if ( !WindowScrollLocker.isBlocked ) {
                        WindowScrollLocker.rememberScrollPosition = e.target.scrollingElement.scrollTop;
                    }
                });
        }
    }

    public block() {
        if ( isPlatformBrowser(this.platformId) && !WindowScrollLocker.isBlocked ) {
            WindowScrollLocker.isBlocked = true;
            let body = this.document.querySelector('body');
            let html = this.document.querySelector('html');
            body.style.height = '100%';
            html.style.height = '100%';
            body.style.minHeight = '100%';
            body.style.position = 'fixed';
            body.style.top = '-' + WindowScrollLocker.rememberScrollPosition + 'px';
            body.style.overflow = 'hidden';
            body.classList.add('body-scroll-locked');
        }
    }

    public unblock() {
        if ( isPlatformBrowser(this.platformId) ) {
            let body = this.document.querySelector('body');
            let html = this.document.querySelector('html');
            let styleBody = body.getAttribute('style');
            if (styleBody) {
                styleBody = body.getAttribute('style').replace(/min-height[^;]+;?/g, '')
                .replace(/position[^;]+;?/g, '')
                .replace(/height[^;]+;?/g, '')
                .replace(/overflow[^;]+;?/g, '')
                .replace(/top[^;]+;?/g, '');
                body.setAttribute('style' , styleBody );
            }
            html.removeAttribute('style');
            window.scrollTo(0, WindowScrollLocker.rememberScrollPosition);
            body.classList.remove('body-scroll-locked');
            WindowScrollLocker.isBlocked = false;
        }
    }
}
