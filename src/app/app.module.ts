import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTES } from './app.routes';

import { WindowEventsService } from './commons/window-events.observer.service';
import { EventsService } from './commons/events.service';
import { AuthorizationObserverService } from './authorization/authorization.observer.service';
import { PlatformDetectService } from './platform-detect.service';
import { FlatsDiscountService } from './commons/flats-discount.service';
import { PhoneObserverService } from './admin-contacts/phone.observer.service';
import { JkService } from './commons/jk.service';
import { WindowScrollLocker } from './commons/window-scroll-block';
import { FavoritesService } from './favorites/favorites.service';

// App is our top level component
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { AboutModule } from './about/about.module';
import { NewsSharesModule } from './news-shares/news-shares.module';
import { FlatsModule } from './flats/flats.module';
import { AdminContactsModule } from './admin-contacts/admin-contacts.module';
import { JkObjectsModule } from './jk-objects/jk-objects.module';
import { PartnersModule } from './partners/partners.module';
import { ContactsModule } from './contacts/contacts.module';
import { FavoritesModule } from './favorites/favorites.module';
import { ApartmentModule } from './apartment/apartment.module';

import { AuthorizationModule } from './authorization/authorization.module';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import '../styles/styles.scss';
import { SeoModule } from './seo/seo.module';
import { MetaTagsRenderService } from './seo/meta-tags-render.service';

// Application wide providers
const APP_PROVIDERS = [
    ...APP_RESOLVER_PROVIDERS,
    AppState,
    WindowEventsService,
    EventsService,
    AuthorizationObserverService,
    PlatformDetectService,
    FlatsDiscountService,
    PhoneObserverService,
    WindowScrollLocker,
    JkService,
    FavoritesService,
    MetaTagsRenderService
];

const APP_MODULES = [
  //  ErrorPageModule,
    AuthorizationModule,
    HomeModule,
    FooterModule,
    HeaderModule,
    AboutModule,
    NewsSharesModule,
    FlatsModule,
    AdminContactsModule,
    JkObjectsModule,
    PartnersModule,
    ContactsModule,
    FavoritesModule,
    ApartmentModule,
    SeoModule,

    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
    // useHash: Boolean(history.pushState) === false,
    preloadingStrategy: PreloadAllModules,
    anchorScrolling: 'enabled',
    onSameUrlNavigation: 'reload',
    scrollPositionRestoration: 'enabled',
    scrollOffset: [0, 64],
    relativeLinkResolution: 'legacy'
})
];

interface StoreType {
  state: InternalStateType;
  restoreInputValues: () => void;
  disposeOldHosts: () => void;
}

@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
      AppComponent
  ],
  imports: [
    ...APP_MODULES,
      BrowserModule.withServerTransition({ appId: 'serverApp' })
  ],
  providers: [
    ...APP_PROVIDERS
  ]
})
export class AppModule {}
