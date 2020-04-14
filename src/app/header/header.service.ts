import { ChangeDetectorRef, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NAVANCHORS } from './navAnchors';
import { HeaderNavComponent } from './header-nav/header-nav.component';

export interface IHeaderLink {
    name: string;
    url: string;
}

@Injectable( )

export class HeaderService {

    public navAnchors = NAVANCHORS;
    public nav: HeaderNavComponent;

    constructor(
        private http: HttpClient,
        private ref: ChangeDetectorRef
    ) { }

    public getDynamicLink() {
        return this.http.get('/api/dynamic/last/link');
    }

    public links(data): IHeaderLink[] {
        let date = new Date();
        let year = (data.year) ? data.year : date.getFullYear();
        let month = (data.month) ? data.month : ( date.getMonth() + 1 );
        return [
            {
                name: 'О компании',
                url: '/about'
            }, {
                name: 'Объекты',
                url: `/objects/list`
            }, {
                name: 'Квартиры',
                url: `/flats/search`
            }, {
                name: 'Контакты',
                url: '/contacts'
            }, {
                name: 'Новости',
                url: '/news-shares'
            }, {
                name: '3-Red Сервис',
                url: '/service'
            }, {
                name: 'Избранное',
                url: '/favorites'
            }
        ];
    }

    public getNavAnchors(page): IHeaderLink[] {
        return this.navAnchors[page];
    }

    // Методы для определения активного якоря навигации и подсчета скролла блока;
    public processScrollForNav(scrollTop, nav) {
        this.nav = nav;
        const activationInterval = (document.documentElement.clientHeight || window.innerHeight || 0) / 3;
        this.findActiveOrNearestAnchor(scrollTop, activationInterval);
        return this.findActiveBlockScrollInterval(scrollTop, activationInterval);
    }

    private findActiveOrNearestAnchor(scrollTop, activationInterval) {
        let hasActiveAnchor = false;
        let hasBackNearestAnchor = false;
        this.nav.anchors.forEach((a) => {
            if ((a.blockOffsetTop - scrollTop) < (activationInterval) && (a.blockOffsetTop + a.blockHeight - scrollTop > activationInterval)) {
                this.nav.activeAnchor = a;
                hasActiveAnchor = true;
                return;
            } else if ((a.blockOffsetTop - scrollTop) < (activationInterval) && (a.blockOffsetTop + a.blockHeight - scrollTop < activationInterval)) {
                this.nav.backNearestAnchor = a;
                hasBackNearestAnchor = true;
            }
        });

        this.nav.activeAnchor = hasActiveAnchor ? this.nav.activeAnchor : {};
        this.nav.backNearestAnchor = hasBackNearestAnchor ? this.nav.backNearestAnchor : {};
    }

    private findActiveBlockScrollInterval(scrollTop, activationInterval) {
        return scrollTop + activationInterval - this.nav.activeAnchor.blockOffsetTop;

    }
    // Методы для определения активного якоря навигации и подсчета скролла блока;

    // Расчет ширины прогресс бара навигации
    public calculateNavProgressWidth(blockScroll, nav) {
        this.nav = nav;
        if (Object.keys(this.nav.activeAnchor).length) {
            const scrollPercent = blockScroll / this.nav.activeAnchor.blockHeight;
            this.nav.progressWidth = this.nav.activeAnchor.linkOffsetLeft + (this.nav.activeAnchor.linkWidth * scrollPercent) + 'px';
        } else {
            if (Object.keys(this.nav.backNearestAnchor).length) {
                this.nav.progressWidth = this.nav.backNearestAnchor.linkOffsetLeft + this.nav.backNearestAnchor.linkWidth;
            } else {
                this.nav.progressWidth = 0 + 'px';
            }
        }
        this.ref.detectChanges();
    }
    // Расчет ширины прогресс бара навигации
}
