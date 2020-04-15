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
import { PlanComponent } from './plan/plan.component';
import { ObjectFlatsService } from './object-flats.service';

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
        RouterModule
    ],
    providers: [ObjectFlatsService]
})

export class ObjectFlatsModule {}
