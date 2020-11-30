import { WindowEventsService } from '../commons/window-events.observer.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HeaderService } from './header.service';
import { JkService } from '../commons/jk.service';
import { FavoritesService } from '../favorites/favorites.service';
import { WindowScrollLocker } from '../commons/window-scroll-block';

@Component({
    selector : 'app-header',
    templateUrl : './header.component.html',
    styleUrls : ['./header.component.scss'],
    providers : [HeaderService]
})

export class HeaderComponent implements OnInit, OnDestroy {

    public isFixed = false;
    public isHidden = false;
    public links = [];
    public pageName;
    public objectId: string;
    public favoriteCounter = 0;
    public openMenu = false;

    public year: number;
    public month: number;
    // подписка на скролл страницы HomePage
    // для фиксации хедера
    private ngUnsubscribe: Subject<void> = new Subject<void>();

    @ViewChild('header')
    public header: ElementRef;

    constructor(
        private scrollLocker: WindowScrollLocker,
        private windowEventsService: WindowEventsService,
        private headerService: HeaderService,
        private router: Router,
        private jkService: JkService,
        private favoritesService: FavoritesService
    ) {}

    public ngOnInit() {
        this.favoritesService.getFavoriteCount().subscribe((value) => this.favoriteCounter = value);

        this.fixedHeader();

        this.jkService.getJkId().subscribe((objectId) => this.headerService.setJkId(objectId) );

        this.router.events
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((event) => {
                if (event instanceof NavigationEnd) {
                    this.pageName = this.router.url.split('/')[1];
                }
            });


        this.links = this.headerService.links();

        setTimeout(() => {
            this.getDynamicLink();
        }, 50);
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

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    public openBurger() {
        if (this.openMenu) {
            this.openMenu = false;
            this.isFixed = true;
            this.scrollLocker.unblock();
        } else {
            this.openMenu = true;
            this.scrollLocker.block();
        }
    }
    public closeMenu() {
        this.openMenu = !this.openMenu;
        this.scrollLocker.unblock();
    }

    // если расстояние скролла больше высоты хедера
    // хедер фиксируется
    public fixedHeader() {

        let prevScrollTop = 0;

        this.windowEventsService.onScroll.subscribe(() => {

            const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
            const headerHeight = document.querySelector('.header').clientHeight;

            if (scrollTop === 0) {
                this.isFixed = false;
                this.isHidden = false;
            } else if (scrollTop > prevScrollTop && scrollTop > headerHeight) {
                this.isHidden = true;
            } else if (scrollTop < prevScrollTop && scrollTop > headerHeight) {
                this.isFixed = true;
                this.isHidden = false;
            }

            prevScrollTop = scrollTop;
        });
    }

}
