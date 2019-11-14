import { FormsRequestModule } from '../forms-request/forms-request.module';
import { ApartmentModule } from './apartment/apartment.module';
import { HouseComponent } from './house/house.component';
import { FloorComponent } from './floor/floor.component';
import { ApartmentComponent } from './apartment/apartment.component';
import { SearchComponent } from './search/search.component';
import { GHMRangeNumberModule } from './search/search-form/ghm-range-number/ghm-range-number.module';
import { FlatsComponent } from './flats.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HouseComponents } from './house/house';
import { FloorComponents } from './floor/floor';
import { SearchComponents } from './search/search';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { PlanComponent } from './plan/plan.component';
import { PlanComponents } from './plan/plan';

const FlatsComponents = [
    FlatsComponent,

    ...HouseComponents,

    ...FloorComponents,

    ...SearchComponents,

    ...PlanComponents
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
            { path: 'flats', component: FlatsComponent,
                children: [
                    { path: '', redirectTo: 'plan', pathMatch: 'full' },
                    { path: 'search', component: SearchComponent },
                    { path: 'plan', component: PlanComponent },
                    { path: 'house/:house', component: HouseComponent },
                    { path: 'house/:house/section/:section/floor/:floor', component: FloorComponent },
                    { path: 'house/:house/section/:section/floor/:floor/apartment/:apartment', component: ApartmentComponent }
                ]
            }
        ])
    ]
})

export class FlatsModule {}
