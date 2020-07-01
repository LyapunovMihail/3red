import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import { HeaderService, IHeaderLink } from '../header.service';
import { Router } from '@angular/router';
import { EventsService } from '../../commons/events.service';
import { ViewportScroller } from '@angular/common';
import { PlatformDetectService } from '../../platform-detect.service';
declare let $: any;

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

    public year: number;
    public month: number;

    constructor(
        public platform: PlatformDetectService,
        private windowEventsService: WindowEventsService,
        private eventsService: EventsService,
        public headerService: HeaderService,
        public router: Router,
        private changeDetectorRef: ChangeDetectorRef,
        private viewportScroller: ViewportScroller
    ) { }

    ngOnInit() {
        if (this.pageName === 'objects') {
            this.getDynamicLink();
        }
    }

    private getDynamicLink() {
        this.headerService.getDynamicLink()
            .subscribe(
                (data) => {
                    const date = new Date();
                    this.year = data.year ? data.year : date.getFullYear();
                    this.month = data.month ? data.month : ( date.getMonth() + 1 );
                },
                (err) => {
                    console.error(err);
                    const date = new Date();
                    this.year = date.getFullYear();
                    this.month = date.getMonth() + 1;
                }
            );
    }

    ngAfterViewInit() {
        if ( !this.platform.isBrowser ) { return false; }

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

            if (this.pageName === 'objects') {
                this.getDynamicLink();
            }
        }
    }

    private getLinksSizes() {
        if ( !this.platform.isBrowser ) { return false; }

        this.anchors.forEach((a) => {
            const link = document.getElementById(`a-${a.url}`);
            a.linkWidth = link.clientWidth;
            a.linkOffsetLeft = link.offsetLeft;
        });
    }

    private getBlocksSizes() {
        if ( !this.platform.isBrowser ) { return false; }

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
        if ( !this.platform.isBrowser ) { return false; }

        if (!$(`#${link}`).length) { return; }
        const destination = $(`#${link}`).offset().top;
        this.viewportScroller.scrollToPosition([0, destination - 96]);
        return false;
    }

    ngOnDestroy() {
        if ( !this.platform.isBrowser ) { return false; }

        this.windowScrollEvent.unsubscribe();
        this.pageResizeEvent.unsubscribe();
    }
}
