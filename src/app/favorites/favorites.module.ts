import {
    FormsModule,
    ReactiveFormsModule
} from '@angular/forms';
import {
    NgModule
} from '@angular/core';
import {
    CommonModule
} from '@angular/common';
import {
    FavoritesComponent
} from './favorites.component';
import {
    RouterModule
} from '@angular/router';
import {
    PriceNumberModule
} from '../price-number/price-number.module';
import {
    FavoritesFormComponent
} from './favorites-form/favorites-form.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild([{
            path: 'favorites',
            component: FavoritesComponent,
            pathMatch: 'full'
        }]),
        PriceNumberModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [FavoritesComponent, FavoritesFormComponent],
    exports: [FavoritesComponent, FavoritesFormComponent]
})
export class FavoritesModule {}
