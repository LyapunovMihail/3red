import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import { IHeaderLink } from '../header.service';
import { Router } from '@angular/router';

interface INavLink extends IHeaderLink {
    blockOffset: number;
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

    public activeAnchor = '';

    public windowEvent;

    constructor(
        private windowEventsService: WindowEventsService,
        public router: Router
    ) { }

    @ViewChild('list')
    public list: ElementRef;

    ngAfterViewInit() {
        const navWidth = this.list.nativeElement.clientWidth;
        const bodyHeight = document.body.clientHeight;

        this.windowEvent = this.windowEventsService.onScroll.subscribe(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            this.setActiveAnchor(scrollTop);
            this.calculateProgressWidth(navWidth, bodyHeight, scrollTop);
        });
    }

    private setActiveAnchor(scrollTop) {
        const distances = this.anchors.map((a) => Math.abs(a.blockOffset - scrollTop + 200));
        const minDistance = Math.min.apply(Math, distances);
        const anchorIndex = distances.indexOf(minDistance);
        this.activeAnchor = this.anchors[anchorIndex].url;
        console.log('distances: ', distances);
        console.log('minDistance: ', minDistance);
        console.log('anchorIndex: ', anchorIndex);
        console.log('this.activeAnchor: ', this.activeAnchor);
    }

    private calculateProgressWidth(navWidth, bodyHeight, scrollTop) {
        const scrollPercent = scrollTop / bodyHeight;
        this.progressWidth = (navWidth * scrollPercent) + 'px';
        console.log('scrollPercent: ', scrollPercent);
        console.log('progressWidth: ', this.progressWidth);
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('anchors' in changes) {
            this.getBlocksOffsets();
        }
    }

    getBlocksOffsets() {
        console.log('anchors: ', this.anchors);
        this.anchors.forEach((a) => {
            a.blockOffset = (document.querySelector(`#${a.url}`) as HTMLElement).offsetTop;
        });
    }

    ngOnDestroy() {
        this.windowEvent.unsubscribe();
    }
}
