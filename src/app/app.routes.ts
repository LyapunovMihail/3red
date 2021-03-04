import { Routes } from '@angular/router';

export const ROUTES: Routes = [
    { path: '', loadChildren : () => import('./home/home.module').then(m => m.HomeModule) },
    { path: 'seo', loadChildren: () => import('./seo/seo.module').then(m => m.SeoModule) },
    { path: 'about', loadChildren: () => import('./about/about.module').then(m => m.AboutModule) },
    { path: 'partners', loadChildren: () => import('./partners/partners.module').then(m => m.PartnersModule) },
    { path: 'contacts', loadChildren: () => import('./contacts/contacts.module').then(m => m.ContactsModule) },
    { path: 'news-shares', loadChildren: () => import('./news-shares/news-shares.module').then(m => m.NewsSharesModule) },
    { path: 'flats', loadChildren: () => import('./flats/flats.module').then(m => m.FlatsModule) },
    { path: 'objects', loadChildren: () => import('./jk-objects/jk-objects.module').then(m => m.JkObjectsModule) },
    { path: 'favorites', loadChildren: () => import('./favorites/favorites.module').then(m => m.FavoritesModule) },
    { path: 'apartment', loadChildren: () => import('./apartment/apartment.module').then(m => m.ApartmentModule) },

    { path: 'error-404', loadChildren: () => import('../app/error-page/error-page.module').then(m => m.ErrorPageModule) },
    { path: '**', loadChildren: () => import('../app/error-page/error-page.module').then(m => m.ErrorPageModule) }
];
