import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnDestroy, SimpleChanges, ViewChild } from '@angular/core';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import { IHeaderLink } from '../header.service';
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
        this.getLinksOffsets();

        this.windowEvent = this.windowEventsService.onScroll.subscribe(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            const activeBlockScroll = this.setActiveAnchor(scrollTop);
            this.calculateProgressWidth(navWidth, bodyHeight, activeBlockScroll, scrollTop);
        });
    }

    private setActiveAnchor(scrollTop) {
        const distances = this.anchors.map((a) => Math.abs(a.blockOffsetTop - scrollTop));
        const minDistance = Math.min.apply(Math, distances);
        const anchorIndex = distances.indexOf(minDistance);
        if (minDistance > 700) {
            this.activeAnchor = {};
        } else {
            this.activeAnchor = this.anchors[anchorIndex];
        }
        console.log('distances: ', distances);
        console.log('minDistance: ', minDistance);
        console.log('anchorIndex: ', anchorIndex);
        console.log('this.activeAnchor: ', this.activeAnchor);
        return minDistance;
    }

    private calculateProgressWidth(navWidth, bodyHeight, blockScroll, scrollTop) {
        if (Object.keys(this.activeAnchor).length) {
            const scrollPercent = blockScroll / this.activeAnchor.blockHeight;
            this.progressWidth = this.activeAnchor.linkOffsetLeft + (this.activeAnchor.linkWidth * scrollPercent) + 'px';
            console.log('scrollPercent: ', scrollPercent);
            console.log('progressWidth: ', this.progressWidth);
        }
        // else {
        //     const scrollPercent = (scrollTop) / (bodyHeight - window.innerHeight - 430);
        //     this.progressWidth = (navWidth * scrollPercent) + 'px';
        //     console.log('scrollPercent: ', scrollPercent);
        //     console.log('progressWidth: ', this.progressWidth);
        // }
        // const scrollPercent = (scrollTop) / (bodyHeight - window.innerHeight - 430);
        // this.progressWidth = (navWidth * scrollPercent) + 'px';
        // console.log('scrollPercent: ', scrollPercent);
        // console.log('progressWidth: ', this.progressWidth);

    }

    ngOnChanges(changes: SimpleChanges) {
        if ('anchors' in changes) {
            this.getBlocksOffsets();
            // добавить вызов changeDetectorRef.detectChanges;
        }
    }

    getLinksOffsets() {
        console.log('anchors: ', this.anchors);
        this.anchors.forEach((a) => {
            const link = document.getElementById(`a-${a.url}`);
            console.log('link: ', link);
            a.linkWidth = link.clientWidth;
            a.linkOffsetLeft = link.offsetLeft;
        });
    }

    getBlocksOffsets() {
        console.log('anchors: ', this.anchors);
        this.anchors.forEach((a) => {
            const block = document.getElementById(`${a.url}`);
            console.log('block: ', block);
            a.blockOffsetTop = block.offsetTop;
            a.blockHeight = Number((block.firstElementChild as HTMLElement).clientHeight);
        });
    }

    ngOnDestroy() {
        this.windowEvent.unsubscribe();
    }
}
