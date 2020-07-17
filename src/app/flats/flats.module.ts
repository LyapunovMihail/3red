import { GHMRangeNumberModule } from './search/search-form/ghm-range-number/ghm-range-number.module';
import { FlatsComponent } from './flats.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SearchComponents } from './search/search';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { FlatsListModule } from './search/search-output/flats-list/flats-list.module';
import { CheckboxListComponent } from './search/search-form/checkbox-list/checkbox-list.component';
import { LoaderModule } from '../UI/loader/loader.module';

const FlatsComponents = [
    FlatsComponent,

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
        FlatsListModule,

        CommonModule,
        RouterModule,
        LoaderModule,
        RouterModule.forChild([
            { path: '', component: FlatsComponent,
                children: [
                    { path: 'search', component: SearchComponent}
                ]
            }
        ])
    ]
})

export class FlatsModule {}
