import { Injectable } from '@angular/core';
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
        private http: HttpClient
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
                url: `/objects`
            }, {
                name: 'Квартиры',
                url: `/flats`
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
        this.setActiveAndPrevAnchor(scrollTop, activationInterval);
        return this.findActiveBlockScrollInterval(scrollTop, activationInterval);
    }

    private setActiveAndPrevAnchor(scrollTop, activationInterval) {
        let hasActiveAnchor = false;
        this.nav.anchors.forEach((a) => {
            if ((a.blockOffsetTop - scrollTop) < (activationInterval) && (a.blockOffsetTop + a.blockHeight - scrollTop > activationInterval)) {
                this.nav.activeAnchor = a;
                this.nav.prevActiveAnchor = this.nav.activeAnchor;
                hasActiveAnchor = true;
            }
        });

        this.nav.activeAnchor = hasActiveAnchor ? this.nav.activeAnchor : {};
    }

    private findActiveBlockScrollInterval(scrollTop, activationInterval) {
        return scrollTop + activationInterval - this.nav.activeAnchor.blockOffsetTop;

    }

    // Расчет ширины прогресс бара навигации
    public calculateNavProgressWidth(blockScroll, scrollTop, prevScrollTop, nav) {
        this.nav = nav;
        if (Object.keys(this.nav.activeAnchor).length) {
            const scrollPercent = blockScroll / this.nav.activeAnchor.blockHeight;
            this.nav.progressWidth = this.nav.activeAnchor.linkOffsetLeft + (this.nav.activeAnchor.linkWidth * scrollPercent) + 'px';
        } else {
            if (prevScrollTop > scrollTop) {
                this.nav.progressWidth = this.nav.prevActiveAnchor.linkOffsetLeft;
            } else {
                this.nav.progressWidth = this.nav.prevActiveAnchor.linkOffsetLeft + this.nav.prevActiveAnchor.linkWidth;
            }
        }
    }
}
