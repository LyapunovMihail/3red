import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import { HeaderService, IHeaderLink } from '../header.service';
import { Router } from '@angular/router';
import { EventsService } from '../../commons/events.service';

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

export class HeaderNavComponent implements OnChanges, AfterViewInit, OnDestroy {

    @Input() public anchors: INavLink[] = [];
    @Input() public isFixed: boolean;
    @Input() public isSided: boolean;
    @Input() public pageName: string;

    public progressWidth = '0px';

    public activeAnchor: any = {};
    public backNearestAnchor: any = {};

    public windowScrollEvent;
    public pageResizeEvent;

    constructor(
        private windowEventsService: WindowEventsService,
        private eventsService: EventsService,
        private headerService: HeaderService,
        public router: Router,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {
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
        }
    }

    private getLinksSizes() {
        this.anchors.forEach((a) => {
            const link = document.getElementById(`a-${a.url}`);
            a.linkWidth = link.clientWidth;
            a.linkOffsetLeft = link.offsetLeft;
        });
    }

    private getBlocksSizes() {
        this.anchors.forEach((a, i, mas) => {
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

    ngOnDestroy() {
        this.windowScrollEvent.unsubscribe();
        this.pageResizeEvent.unsubscribe();
    }
}
