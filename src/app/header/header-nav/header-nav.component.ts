import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import { HeaderService, IHeaderLink } from '../header.service';
import { Router } from '@angular/router';
import { EventsService } from '../../commons/events.service';
import { ViewportScroller } from '@angular/common';
import { PlatformDetectService } from '../../platform-detect.service';
import { IObjectDynamicSnippet } from '../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
import { Subscription } from 'rxjs';

interface INavLink extends IHeaderLink {
    blockOffsetTop: number;
    blockHeight: number;
    linkWidth: number;
    linkOffsetLeft: number;
    show: true;
}

@Component({
    selector: 'app-header-nav',
    templateUrl: './header-nav.component.html',
    styleUrls: ['./header-nav.component.scss']
})

export class HeaderNavComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {

    @Input() public anchors: INavLink[] = [];
    @Input() public isFixed: boolean;
    @Input() public isSided: boolean;
    @Input() public pageName: string;

    public progressWidth = '0px';

    public activeAnchor: any = {};
    public backNearestAnchor: any = {};

    public windowScrollEvent;
    public pageResizeEvent;

    // public year: number;
    // public month: number;
    public hasPhotos = false;
    public lastMothWithPhotos: number;
    public lastYearWithPhotos: number;
    public isAuthorized = false;
    private subs: Subscription[] = [];

    constructor(
        public platform: PlatformDetectService,
        private windowEventsService: WindowEventsService,
        private eventsService: EventsService,
        public headerService: HeaderService,
        public router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private viewportScroller: ViewportScroller,
        private authorization: AuthorizationObserverService,
    ) {
    }

    ngOnInit() {
        this.getDynamicLink();
        this.checkAuth();
    }

    private getDynamicLink() {
        const date = new Date();
        this.lastMothWithPhotos = date.getMonth() + 1;
        this.lastYearWithPhotos = date.getFullYear();
        if (this.pageName === 'objects') {
            this.setLastDateWithPhotos();
            this.setVisibilityForDynamicBtn();
        }
    }
    private setLastDateWithPhotos() {
        this.headerService.getDynamicLink().subscribe((data: IObjectDynamicSnippet[]) => {
                if (data.length > 0) {
                    data.forEach((item) => {
                        if (item && item.year && item.year > this.lastYearWithPhotos) {
                            this.lastYearWithPhotos = item.year;
                        }
                        if (item && item.month && item.month > this.lastMothWithPhotos) {
                            this.lastMothWithPhotos = item.month;
                        }
                    });
                }
            });
    }
    private setVisibilityForDynamicBtn() {
        this.headerService.getTabsSnippetById().subscribe(data => {
            if (!data || !data.dynamic) { return; }
            this.hasPhotos = data.dynamic.some(el => el.show);
        });
    }

    private checkAuth() {
        this.subs.push(this.authorization.getAuthorization().subscribe((val) => {
            this.isAuthorized = val;
        }));

    }

    ngAfterViewInit() {
        if (!this.platform.isBrowser) {
            return false;
        }

        setTimeout(() => {
            this.getLinksSizes();

            this.windowScrollEvent = this.windowEventsService.onScroll.subscribe(() => {
                const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                const activeBlockScroll = this.headerService.processScrollForNav(scrollTop, this);
                this.headerService.calculateNavProgressWidth(activeBlockScroll, this);
            });
        }, 200);
        this.pageResizeEvent = this.eventsService.getResizeEventEmitter().subscribe(() => {
            setTimeout(() => {
                this.getBlocksSizes();
            }, 200);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('anchors' in changes) {
            setTimeout(() => {
                this.getBlocksSizes();
                this.changeDetectorRef.detectChanges();
            }, 200);

            this.getDynamicLink();
        }
    }

    private getLinksSizes() {
        if (!this.platform.isBrowser) {
            return false;
        }

        this.anchors.forEach((a) => {
            const link = document.getElementById(`a-${a.url}`);
            a.linkWidth = link.clientWidth;
            a.linkOffsetLeft = link.offsetLeft;
        });
    }

    private getBlocksSizes() {
        if (!this.platform.isBrowser) {
            return false;
        }

        this.anchors.forEach((a) => {
            const block = document.getElementById(`${a.url}`);
            if (!block) { // Если блок = undefined, обнуляю offsetTop для скрытия пунктов чьи компоненты отстутствуют
                return;
            }
            a.blockOffsetTop = block.offsetTop;
            a.blockHeight = Number((block.firstElementChild as HTMLElement).clientHeight);
            if (a.blockHeight < 50) { // Если у блока слишком маленькая высота, значит он не виден и его надо убрать из навпанели
                a.blockOffsetTop = 0;
                return;
            }
        });
    }

    // Скролл до якоря
    public scrollLink(link) {
        if (!this.platform.isBrowser) {
            return false;
        }

        if (!document.querySelector(`#${link}`)) {
            return;
        }
        this.viewportScroller.scrollToAnchor(link);
        return false;
    }

    ngOnDestroy() {
        if (!this.platform.isBrowser) {
            return false;
        }

        if (this.windowScrollEvent && this.pageResizeEvent) {
            this.windowScrollEvent.unsubscribe();
            this.pageResizeEvent.unsubscribe();
        }

        this.subs.forEach(item => item.unsubscribe());
    }
}
