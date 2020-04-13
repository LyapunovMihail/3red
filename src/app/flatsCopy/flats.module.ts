import { ApartmentModule } from './apartment/apartment.module';
import { GHMRangeNumberModule } from './search/search-form/ghm-range-number/ghm-range-number.module';
import { FlatsComponent } from './flats.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HouseComponents } from './house/house';
import { FloorComponents } from './floor/floor';
import { SearchComponents } from './search/search';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';

const FlatsComponents = [
    FlatsComponent,

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
            { path: 'flats', component: FlatsComponent,
                children: [
                    { path: 'search', component: SearchComponent}
                ]
            }
        ])
    ]
})

export class FlatsModule {}
