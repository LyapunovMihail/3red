import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouterModule } from '@angular/router';
import { PriceNumberModule } from '../price-number/price-number.module';
import { FavoritesFormComponent } from './favorites-form/favorites-form.component';
import { ModalApartamenModule } from '../flats/modal-apartament/modal-apartament.module';
import { ModalApartamentComponent } from '../flats/modal-apartament/modal-apartament.component';

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
        ModalApartamenModule
    ],
    declarations: [
        FavoritesComponent,
        FavoritesFormComponent
    ],
    exports: [
        FavoritesComponent,
        FavoritesFormComponent,
        ModalApartamentComponent
    ]
})
export class FavoritesModule {}
