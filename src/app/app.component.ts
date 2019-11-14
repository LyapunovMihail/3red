import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from './app.service';
import { FlatsDiscountService } from './commons/flats-discount.service';

export const ROOT_SELECTOR = 'app-root';

@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.css'
  ],
  template: `
      <app-authorization></app-authorization>
      <app-admin-contacts></app-admin-contacts>

      <section>

          <app-header></app-header>

          <router-outlet></router-outlet>

          <app-footer></app-footer>

      </section>

      <app-overlay></app-overlay>
      <app-img-modal></app-img-modal>
      <app-video-modal></app-video-modal>
  `,
    providers: []
})
export class AppComponent implements OnInit {

    public previousUrl: string;
    public currentUrl: string;

    constructor(
        public appState: AppState,
        private router: Router,
        public flatsDiscountService: FlatsDiscountService
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
            window.scrollTo(0, 0);
        });

        // Загружаем акции для дальнейшего вычисления скидки по квартирам
        this.flatsDiscountService.getShares();
    }
}
