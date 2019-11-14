import { WindowEventsService } from '../commons/window-events.observer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { WindowScrollLocker } from '../commons/window-scroll-block';
import { HeaderService } from './header.service';


@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.scss'],
    providers : [
        HeaderService,
        WindowScrollLocker
    ]
})

export class HeaderComponent implements OnInit, OnDestroy {

    public links = [];
    public active = false;
    public isFixed: boolean;
    public isHidden: boolean;

    // подписка на скролл страницы HomePage
    // для фиксации хедера
    private ngUnsubscribe: Subject<void> = new Subject<void>();
    private subscriptions: Subscription[] = [];

    constructor(
        private windowEventsService: WindowEventsService,
        public  windowScrollLocker: WindowScrollLocker,
        private headerService: HeaderService
    ) {
    }

    public ngOnInit() {

        this.fixedHeader();
        this.headerService.getDynamicLink()
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe(
                (data) => {
                    this.links = this.headerService.links(data);
                },
                (err) => {
                    console.error(err);
                    let date = new Date();
                    this.links = this.headerService.links({ year: date.getFullYear(), month: ( date.getMonth() + 1 ) });
                }
            );
    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();

    }

    public toggleNav() {
        this.active = !this.active;
        if (this.active) { this.windowScrollLocker.block(); }
        if (!this.active) { this.windowScrollLocker.unblock(); }
    }

    public closeNav() {
      this.active = false;
      this.windowScrollLocker.unblock();
    }

    public showFullVersion() {
        this.headerService.writeSessionForFullVersion().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
          (data) => document.location.reload(true),
          (error) => console.log(error)
        );
    }

    // если расстояние скрлла больше высоты хедера
    // хедер фиксируется
    public fixedHeader() {

        let winScrollTopPrev = 0;

        this.subscriptions.push(this.windowEventsService.onScroll.subscribe(() => {

            const headerHeight = document.querySelector('.header').clientHeight;
            const winScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

            if (winScrollTop > headerHeight || this.active) {
                this.isFixed = true;
            } else if (winScrollTop < headerHeight) {
                this.isFixed = false;
            }

            if (winScrollTop < headerHeight || winScrollTopPrev > winScrollTop) {
                this.isHidden = false;
            } else if (winScrollTopPrev < winScrollTop) {
                this.isHidden = true;
            }

            winScrollTopPrev = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        }));
    }
}
