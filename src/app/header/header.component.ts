import { WindowEventsService } from '../commons/window-events.observer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { HeaderService } from './header.service';

declare let $: any;

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.scss'],
    providers : [HeaderService]
})

export class HeaderComponent implements OnInit, OnDestroy {

    public isFixed: boolean;
    public isHidden: boolean;
    public links = [];

    // подписка на скролл страницы HomePage
    // для фиксации хедера
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private subscriptions: Subscription[] = [];

    constructor(
        private windowEventsService: WindowEventsService,
        private headerService: HeaderService,
        private router: Router
    ) {
        this.isFixed = true;
    }

    public ngOnInit() {

        this.router.events
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {

                    if (this.router.url === '/' || this.router.url === '/about') {
                        this.fixedHeader();
                        this.isFixed = false;
                    } else {
                        this.subscriptions.forEach((sub) => {
                            sub.unsubscribe();
                        });
                        this.isFixed = false;
                        this.isHidden = false;
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
        this.subscriptions.forEach((sub) => {
            sub.unsubscribe();
        });
    }

    // если расстояние скрлла больше высоты хедера
    // хедер фиксируется
    public fixedHeader() {

        let winScrollTopPrev = 0;

        this.subscriptions.push(this.windowEventsService.onScroll.subscribe(() => {

            const headerHeight = document.querySelector('.header').clientHeight;
            const winScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            const headerScrollTop = winScrollTop + document.querySelector('.header__nav').getBoundingClientRect().top;

            if (winScrollTop > headerScrollTop + 46) { // 46 - высота header__nav
                this.isFixed = true;
            } else if (winScrollTop < headerHeight - 46) { // 46 - высота header__nav
                this.isFixed = false;
            }

            this.isHidden = winScrollTopPrev < winScrollTop;

            winScrollTopPrev = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        }));
    }

    public checkLink(linkUrl) {
        return this.router.url.split('/')[1] === linkUrl.split('/')[1];
    }
}
