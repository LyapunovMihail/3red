import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
/*
 * Platform and Environment providers/directives/pipes
 */
import { environment } from 'environments/environment';
import { ROUTES } from './app.routes';

import { WindowEventsService } from './commons/window-events.observer.service';
import { EventsService } from './commons/events.service';
import { AuthorizationObserverService } from './authorization/authorization.observer.service';
import { PlatformDetectService } from './platform-detect.service';
import { FlatsDiscountService } from './commons/flats-discount.service';
import { PhoneObserverService } from './admin-contacts/phone.observer.service';
import { JkService } from './commons/jk.service';
import { WindowScrollLocker } from './commons/window-scroll-block';

// App is our top level component
import { AppComponent } from './app.component';
import { HomeModule } from './home/home.module';
import { LocationModule } from './location/location.module';
import { FooterModule } from './footer/footer.module';
import { HeaderModule } from './header/header.module';
import { DynamicModule } from './dynamic/dynamic.module';
import { AboutModule } from './about/about.module';
import { NewsSharesModule } from './news-shares/news-shares.module';
import { DecorationModule } from './decoration/decoration.module';
import { FlatsModule } from './flats/flats.module';
import { ParkingModule } from './parking/parking.module';
import { StoreroomsModule } from './storerooms/storerooms.module';
import { AdminContactsModule } from './admin-contacts/admin-contacts.module';
import { JkObjectsModule } from './jk-objects/jk-objects.module';
import { ServiceModule } from './service/service.module';

// import { ErrorPageModule } from './error-page/error-page.module';
import { AuthorizationModule } from './authorization/authorization.module';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';

import '../styles/styles.scss';

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
    JkService
];

const APP_MODULES = [
  //  ErrorPageModule,
    AuthorizationModule,
    HomeModule,
    LocationModule,
    FooterModule,
    HeaderModule,
    DynamicModule,
    AboutModule,
    NewsSharesModule,
    DecorationModule,
    FlatsModule,
    ParkingModule,
    StoreroomsModule,
    AdminContactsModule,
    JkObjectsModule,
    ServiceModule,

    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, {
        useHash: Boolean(history.pushState) === false,
        preloadingStrategy: PreloadAllModules,
        anchorScrolling: 'enabled',
        onSameUrlNavigation: 'reload',
        scrollPositionRestoration: 'enabled',
        scrollOffset: [0, 64]
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
    ...APP_MODULES
  ],
  providers: [
    ...APP_PROVIDERS
  ]
})
export class AppModule {}
