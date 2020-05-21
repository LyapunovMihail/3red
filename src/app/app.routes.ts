import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: '', loadChildren : './home/home.module#HomeModule' },
    { path: 'about', loadChildren: './about/about.module#AboutModule' },
    { path: 'service', loadChildren: './service/service.module#ServiceModule' },
    { path: 'contacts', loadChildren: './contacts/contacts.module#ContactsModule' },
    { path: 'news-shares', loadChildren: './news-shares/news-shares.module#NewsSharesModule' },
    { path: 'flats', loadChildren: './flats/flats.module#FlatsModule' },
    { path: 'parking', loadChildren: './parking/parking.module#ParkingModule' },
    { path: 'storerooms', loadChildren: './storerooms/storerooms.module#StoreroomsModule' },
    { path: 'objects', loadChildren: './jk-objects/jk-objects.module#JkObjectsModule' },
    { path: 'favorites', loadChildren: './favorites/favorites.module#FavoritesModule' },

    { path: 'error-404', loadChildren: '../app/error-page/error-page.module#ErrorPageModule' },
    { path: '**', loadChildren: '../app/error-page/error-page.module#ErrorPageModule' }
];
