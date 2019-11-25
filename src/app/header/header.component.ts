import { WindowEventsService } from '../commons/window-events.observer.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HeaderService } from './header.service';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.scss'],
    providers : [HeaderService]
})

export class HeaderComponent implements OnInit, OnDestroy {

    public isFixed = false;
    public isHidden = false;
    public navFixed = false;
    public navSided = false;
    public links = [];
    public navAnchors = [];
    public hoveredLink = -1;
    public pageName;
    // подписка на скролл страницы HomePage
    // для фиксации хедера
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private windowEventsService: WindowEventsService,
        private headerService: HeaderService,
        private router: Router
    ) {
    }

    public ngOnInit() {
        this.fixedHeader();

        this.router.events
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.pageName = this.router.url.split('/')[1];
                    if (this.pageName === 'about' || this.pageName === 'objects') {
                        this.navAnchors = this.headerService.getNavAnchors(this.pageName);
                    } else {
                        this.navAnchors = [];
                    }
                }
            });

        this.headerService.getDynamicLink()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                (data) => {
                    this.links = this.headerService.links(data);
                },
                (err) => {
                    console.error(err);
                    const date = new Date();
                    this.links = this.headerService.links({ year: date.getFullYear(), month: ( date.getMonth() + 1 ) });
                }
            );
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    // если расстояние скролла больше высоты хедера
    // хедер фиксируется

    @ViewChild('header')
    public header: ElementRef;

    public fixedHeader() {

        let prevScrollTop = 0;
        const headerHeight = this.header.nativeElement.clientHeight;

        this.windowEventsService.onScroll.subscribe(() => {

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            if (scrollTop === 0) {
                this.isFixed = false;
                this.isHidden = false;
                this.navFixed = false;
                this.navSided = false;
            } else if (scrollTop > prevScrollTop && scrollTop > headerHeight) {
                this.isHidden = true;
                this.navFixed = true;
                this.navSided = false;
            } else if (scrollTop < prevScrollTop && scrollTop > headerHeight) {
                this.isFixed = true;
                this.isHidden = false;
                this.navSided = true;
            }

            prevScrollTop = scrollTop;
        });
    }

    public checkLink(linkUrl) {
        return this.pageName === linkUrl.split('/')[1];
    }
}
