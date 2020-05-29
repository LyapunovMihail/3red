import { ApartmentModule } from './apartment/apartment.module';
import { GHMRangeNumberModule } from './search/search-form/ghm-range-number/ghm-range-number.module';
import { ObjectFlatsComponent } from './object-flats.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HouseComponents } from './house/house';
import { FloorComponents } from './floor/floor';
import { SearchComponents } from './search/search';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ObjectFlatsService } from './object-flats.service';
import { PlanComponents } from './plan/plan';
import { ParkingModule } from './parking/parking.module';
import { StoreroomsModule } from './storerooms/storerooms.module';
import { HouseComponent } from './house/house.component';
import { FloorComponent } from './floor/floor.component';
import { ApartmentComponent } from './apartment/apartment.component';

const FlatsComponents = [
    ObjectFlatsComponent,

    ...PlanComponents,

    ...HouseComponents,

    ...FloorComponents,

    ...SearchComponents,
];

@NgModule({
    exports: [
        ...FlatsComponents
    ],
    declarations: [
        ...FlatsComponents
    ],
    imports: [
        ReactiveFormsModule,
        FormsModule,
        GHMRangeNumberModule,
        ApartmentModule,
        ParkingModule,
        StoreroomsModule,

        CommonModule,
        RouterModule.forChild([
            { path: 'list/:id/flats', component: ObjectFlatsComponent,
                children: [
                    { path: '', redirectTo: 'house/all', pathMatch: 'full' },
                    { path: 'house/:house', component: HouseComponent },
                    { path: 'house/:house/section/:section/floor/:floor', component: FloorComponent },
                    { path: 'house/:house/section/:section/floor/:floor/apartment/:apartment', component: ApartmentComponent }
                ]
            },
        ])
    ],
    providers: [ObjectFlatsService]
})

export class ObjectFlatsModule {}
