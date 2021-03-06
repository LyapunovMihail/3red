import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from './app.service';
import { FlatsDiscountService } from './commons/flats-discount.service';
import { FavoritesService } from './favorites/favorites.service';

export const ROOT_SELECTOR = 'app-root';

@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  template: `
      <section>

          <app-header></app-header>

          <router-outlet></router-outlet>

          <app-footer [isContacts]="isContacts"></app-footer>

      </section>
  `,
    providers: []
})
export class AppComponent implements OnInit {

    public previousUrl: string;
    public currentUrl: string;
    public isContacts = false;

    constructor(
        public appState: AppState,
        private router: Router,
        public flatsDiscountService: FlatsDiscountService,
        public favoritesService: FavoritesService
    ) {}

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);

        // Подписываемся на событие смены маршрута роутера чтобы скроллить вверх страницы при смене маршрута
        this.router.events.subscribe((event) => {
            if (!(event instanceof NavigationEnd)) {
              return;
            }
            this.previousUrl = this.currentUrl;
            this.currentUrl = this.router.url;
            if ((this.previousUrl && this.previousUrl.startsWith('/flats/house')) && this.currentUrl.startsWith('/flats/house')) { // и пресекаем скролл если маршрут сменяется
                return;                                                   // на одной и той же странице дома (переключаются параметры поиска)
            }
            this.isContactPage(this.router.url);
            window.scrollTo(0, 0);
        });

        // Загружаем акции для дальнейшего вычисления скидки по квартирам
        this.flatsDiscountService.getShares();
        // Загружаем избранные квартиры
        this.favoritesService.getFavoriteFlats();
    }

    public isContactPage(url) {
        if (url !== '/contacts') {
            this.isContacts = false;
            return;
        }
        this.isContacts = true;
        const body = document.querySelector('body');

        body.style.padding = (this.isContacts && body.clientWidth > 767) ? '86px 0 0' : '';
    }
}
