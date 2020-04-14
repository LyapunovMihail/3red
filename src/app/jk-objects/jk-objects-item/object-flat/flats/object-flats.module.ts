import { ApartmentModule } from './apartment/apartment.module';
import { FloorComponent } from './floor/floor.component';
import { GHMRangeNumberModule } from './search/search-form/ghm-range-number/ghm-range-number.module';
import { ObjectFlatsComponent } from './object-flats.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HouseComponents } from './house/house';
import { FloorComponents } from './floor/floor';
import { SearchComponents } from './search/search';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlanComponent } from './plan/plan.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { HouseComponent } from './house/house.component';

const FlatsComponents = [
    ObjectFlatsComponent,
    PlanComponent,

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

        CommonModule,
        RouterModule,
        RouterModule.forChild([
            { path: 'flats', component: ObjectFlatsComponent,
                children: [
                    { path: '', redirectTo: 'house/all', pathMatch: 'full' },
                    { path: 'house/:house', component: HouseComponent },
                    { path: 'house/:house/section/:section/floor/:floor', component: FloorComponent },
                    { path: 'house/:house/section/:section/floor/:floor/apartment/:apartment', component: ApartmentComponent }
                ]
            }
        ])
    ]
})

export class ObjectFlatsModule {}