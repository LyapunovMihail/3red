import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import { HeaderService, IHeaderLink } from '../header.service';
import { Router } from '@angular/router';

interface INavLink extends IHeaderLink {
    blockOffsetTop: number;
    blockHeight: number;
    linkWidth: number;
    linkOffsetLeft: number;
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
    public prevActiveAnchor: any = {};

    public windowEvent;

    constructor(
        private windowEventsService: WindowEventsService,
        private headerService: HeaderService,
        public router: Router,
        private changeDetectorRef: ChangeDetectorRef
    ) { }

    ngAfterViewInit() {
        let prevScrollTop = 0;
        this.getLinksSizes();

        this.windowEvent = this.windowEventsService.onScroll.subscribe(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            const activeBlockScroll = this.headerService.processScrollForNav(scrollTop, this);
            this.headerService.calculateNavProgressWidth(activeBlockScroll, scrollTop, prevScrollTop, this);
            prevScrollTop = scrollTop;
        });
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('anchors' in changes) {
            this.getBlocksSizes();
            this.changeDetectorRef.detectChanges();
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
        this.anchors.forEach((a) => {
            const block = document.getElementById(`${a.url}`);
            a.blockOffsetTop = block.offsetTop;
            a.blockHeight = Number((block.firstElementChild as HTMLElement).clientHeight);
        });
    }

    ngOnDestroy() {
        this.windowEvent.unsubscribe();
    }
}
