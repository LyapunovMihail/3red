import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../commons/events.service';
import { WindowEventsService } from '../commons/window-events.observer.service';
import { AuthorizationObserverService } from '../authorization/authorization.observer.service';
import { PlatformDetectService } from '../platform-detect.service';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    providers : []
})

export class AboutComponent implements OnInit, AfterViewInit, OnDestroy {

    @ViewChild('container')
    public container: ElementRef;
    // @ViewChild('helper')
    // public helper: ElementRef;

    public windowScrollEvent;
    public scrollTop;
    public intervalTimer;

    public authorizationEvent;
    public isAuthorizated = false;

    constructor(
        private platform: PlatformDetectService,
        private eventsService: EventsService,
        private windowEventsService: WindowEventsService,
        private authorization: AuthorizationObserverService
    ) { }

    public ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });
    }

    ngAfterViewInit() {
        if (!this.platform.isBrowser) { return; }

        this.eventsService.checkHeightResize(this, this.container);
        // this.fixBlock();
    }

    // fixBlock() {
    //     this.windowScrollEvent = this.windowEventsService.onScroll.subscribe(() => {
    //         this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    //         const helper = this.helper.nativeElement;
    //         const functions = document.getElementById('functions').firstElementChild as HTMLElement;
    //         if (this.scrollTop > functions.offsetTop  - 77) {
    //             functions.classList.add('functions--fixed');
    //             helper.style.marginTop = `${functions.getBoundingClientRect().height + 400}px`;
    //         }
    //         if (this.scrollTop < functions.offsetTop + functions.getBoundingClientRect().height + 500) {
    //             functions.classList.remove('functions--fixed');
    //         }
    //     });
    // }

    public ngOnDestroy() {
        if (!this.platform.isBrowser) { return; }

        this.authorizationEvent.unsubscribe();
        if (this.intervalTimer) {
            clearInterval(this.intervalTimer);
        }
        // this.windowScrollEvent.unsubscribe();
    }
}
