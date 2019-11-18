import { SearchFormPipe } from './search-form/search-form.pipe';
import { CheckboxListComponent } from './search-form/checkbox-list/checkbox-list.component';
import { SectionsSelectComponent } from './search-form/sections-select/sections-select.component';
import { GHMRangeNumberModule } from './search-form/ghm-range-number/ghm-range-number.module';
import { SearchFormComponent } from './search-form/search-form.component';
import { FlatsComponent } from './flats.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FormsRequestModule } from '../forms-request/forms-request.module';
import { ModalApartamenModule } from './modal-apartament/modal-apartament.module';
import { SearchSortingComponent } from './search-sorting/search-sorting.component';
import { SearchOutputModule } from './search-output/search-output.module';
import { SearchOutputComponent } from './search-output/search-output.component';

const FlatsComponents = [
    FlatsComponent,
    SearchFormComponent,
    SectionsSelectComponent,
    CheckboxListComponent,
    SearchFormPipe,
    SearchSortingComponent
];

@NgModule({
    exports: [
        ...FlatsComponents,
        SearchOutputComponent

    ],
    declarations: [
        ...FlatsComponents
    ],
    imports: [
        FormsRequestModule,
        ModalApartamenModule,
        SearchOutputModule,
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        GHMRangeNumberModule,
        RouterModule.forChild([
            { path: 'flats', redirectTo: '/flats/search', pathMatch: 'full' },
            { path: 'flats/search', component: FlatsComponent, pathMatch: 'full' }
        ])
    ]
})

export class FlatsModule {}
