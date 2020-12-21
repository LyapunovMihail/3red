import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: '', loadChildren : './home/home.module#HomeModule' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'partners', loadChildren: './partners/partners.module#PartnersModule' },
    { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
    { path: 'news-shares', loadChildren: './news-shares/news-shares.module#NewsSharesModule' },
    { path: 'flats', loadChildren: './flats/flats.module#FlatsModule' },
    { path: 'objects', loadChildren: './jk-objects/jk-objects.module#JkObjectsModule' },
    { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesModule' },
    { path: 'apartment', loadChildren: './apartment/apartment.module#ApartmentModule' },

    { path: 'error-404', loadChildren: './error-page/error-page.module#ErrorPageModule' },
    { path: '**', loadChildren: './error-page/error-page.module#ErrorPageModule' }
];
