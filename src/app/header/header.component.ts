import { WindowEventsService } from '../commons/window-events.observer.service';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef, Input } from '@angular/core';
import { NavigationEnd, Router, NavigationStart } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HeaderService } from './header.service';
import { JkService } from '../commons/jk.service';
import set = Reflect.set;
import { FavoritesService } from '../favorites/favorites.service';

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
    public objectId: string;
    public favoriteCounter = 0;
    // подписка на скролл страницы HomePage
    // для фиксации хедера
    private ngUnsubscribe: Subject<void> = new Subject<void>();

   public preloader = false;

    @ViewChild('header')
    public header: ElementRef;

    constructor(
        private windowEventsService: WindowEventsService,
        private headerService: HeaderService,
        private router: Router,
        private jkService: JkService,
        private favoritesService: FavoritesService
    ) {
    }

    public ngOnInit() {
        this.favoritesService.getFavoriteCount().subscribe((value) => this.favoriteCounter = value);

        this.fixedHeader();

        this.jkService.getJkId().subscribe((objectId) => this.headerService.setJkId(objectId) );

        this.router.events
            .pipe(takeUntil(this.ngUnsubscribe))
            .subscribe((event) => {
                if (event instanceof NavigationStart) { this.preloader = true; }
                if (event instanceof NavigationEnd) {
                    setTimeout( () => this.preloader = false, 2000);
                    this.pageName = this.router.url.split('/')[1];
                    if (this.pageName === 'about' || (this.pageName === 'objects' && this.router.url.split('/')[3]
                        && !this.router.url.split('/')[4])) { // если страница о компании или конкретного объекта, устанавливаем массив якорей для панели навигации
                        this.navAnchors = this.headerService.getNavAnchors(this.pageName);
                    } else if (this.pageName === 'objects' && this.router.url.split('/')[4]) { // Если открыта страница "фотоотчет" объекта, не заполняем массив навигации
                        this.navAnchors = [];
                    } else {
                        this.navAnchors = [];
                    }
                }
            });


        this.links = this.headerService.links();

    }

    public ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    // если расстояние скролла больше высоты хедера
    // хедер фиксируется
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
