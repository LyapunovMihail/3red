import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: '', loadChildren : './home/home.module#HomeModule' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'purchase', loadChildren: './purchase/purchase.module#PurchaseModule' },
    { path: 'news-shares', loadChildren : './news-shares/news-shares.module#NewsSharesModule' },
    { path: 'decoration', loadChildren: './decoration/decoration.module#DecorationModule' },
    { path: 'location', loadChildren: './location/location.module#LocationModule' },
    { path: 'flats/search', loadChildren : './flats/flats.module#FlatsModule' },
    { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesModule' },

    { path: 'error-404', loadChildren: './error-page/error-page.module#ErrorPageModule' },
    { path: '**', loadChildren: './error-page/error-page.module#ErrorPageModule' }
];
