import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FavoritesComponent } from './favorites.component';
import { RouterModule } from '@angular/router';
import { FlatsListModule } from './flats-list/flats-list.module';

@NgModule({
    exports: [
        FavoritesComponent
    ],
    declarations: [
        FavoritesComponent
    ],
    imports: [
        CommonModule,
        FlatsListModule,
        RouterModule.forChild([
            {
                path: '', component: FavoritesComponent
            }
        ])
    ]
})
export class FavoritesModule {
}
