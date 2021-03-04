import { Component, ElementRef, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AppState } from './app.service';
import { FlatsDiscountService } from './commons/flats-discount.service';
import { FavoritesService } from './favorites/favorites.service';
import {
    trigger,
    animate,
    transition,
    style,
    query
  } from '@angular/animations';
import { MetaTagsRenderService } from './seo/meta-tags-render.service';

export const ROOT_SELECTOR = 'app-root';

@Component({
  selector: ROOT_SELECTOR,
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './app.component.scss'
  ],
  template: `
      <app-authorization></app-authorization>
      <app-admin-contacts></app-admin-contacts>

      <section #container>

          <app-header></app-header>

            <div [@fadeAnimation]="o.isActivated ? o.activatedRoute : ''">
                <router-outlet #o="outlet"  style= 'position: relative'></router-outlet>
            </div>

          <app-footer></app-footer>

      </section>
  `,
    providers: [],
    animations: [
        trigger('fadeAnimation', [

            transition('* <=> *', [
                style({height: '!', position: 'relative'}),

              query(':enter', [style({ opacity: 0, position: 'absolute', top: 0, left: 0,  width: '100%'})], { optional: true }),
              query(
                ':enter',
                [style({ opacity: 0 }), animate('0.3s', style({ opacity: 1 }))],
                { optional: true }
              )
            ])
          ])
    ]
})
export class AppComponent implements OnInit {

    @ViewChild('container')
    public container: ElementRef;

    public previousUrl: string;
    public currentUrl: string;

    constructor(
        public appState: AppState,
        private router: Router,
        public flatsDiscountService: FlatsDiscountService,
        public favoritesService: FavoritesService,
        private metaTagsRenderService: MetaTagsRenderService
    ) {}

    public ngOnInit() {
        console.log('Initial App State', this.appState.state);

        // Подписываемся на событие смены маршрута роутера чтобы скроллить вверх страницы при смене маршрута
        this.router.events.subscribe((event) => {
            if (!(event instanceof NavigationEnd)) {
                return;
            }

            setTimeout(() => {
                this.metaTagsRenderService.render(this.router.url, this.container);
            }, 500);

            this.previousUrl = this.currentUrl;
            this.currentUrl = this.router.url;
            if ((this.previousUrl && this.previousUrl.startsWith('/flats/house')) && this.currentUrl.startsWith('/flats/house')) { // и пресекаем скролл если маршрут сменяется
                return;                                                   // на одной и той же странице дома (переключаются параметры поиска)
            }
            window.scrollTo(0, 0);
        });

        // Загружаем акции для дальнейшего вычисления скидки по квартирам
        this.flatsDiscountService.getShares();
        // Загружаем избранные квартиры
        this.favoritesService.getFavoriteFlats();
    }
}
