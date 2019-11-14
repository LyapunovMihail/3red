import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: '', loadChildren : './home/home.module#HomeModule' },
    { path: 'location', loadChildren: './location/location.module#LocationModule' },
    { path: 'dynamic/:year/:month', loadChildren: './dynamic/dynamic.module#DynamicModule' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'purchase', loadChildren: './purchase/purchase.module#PurchaseModule' },
    { path: 'news-shares', loadChildren: './news-shares/news-shares.module#NewsSharesModule' },
    { path: 'decoration', loadChildren: './decoration/decoration.module#DecorationModule' },
    { path: 'flats', loadChildren: './flats/flats.module#FlatsModule' },
    { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesModule' },
    { path: 'parking', loadChildren: './parking/parking.module#ParkingModule' },
    { path: 'storerooms', loadChildren: './storerooms/storerooms.module#StoreroomsModule' },

    { path: 'error-404', loadChildren: '../app/error-page/error-page.module#ErrorPageModule' },
    { path: '**', loadChildren: '../app/error-page/error-page.module#ErrorPageModule' }
];
