import { GHMRangeNumberModule } from './search-form/ghm-range-number/ghm-range-number.module';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FlatsComponent } from './flats.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchOutputComponent } from './search-output/search-output.component';
import { SearchSortingComponent } from './search-sorting/search-sorting.component';
import { ModSelectComponent } from './search-form/mod-select/mod-select.component';
import { SearchFormPipe } from './search-form/search-form.pipe';
import { CheckboxListComponent } from './search-form/checkbox-list/checkbox-list.component';
import { CheckboxListDecorComponent } from './search-form/checkbox-list-decor/checkbox-list-decor.component';
import { ApartmentModule } from './apartment/apartment.module';
import { FlatSnippetModule } from './flat-snippet/flat-snippet.module';

const FlatsComponents = [
    FlatsComponent,
    SearchFormComponent,
    SearchOutputComponent,
    SearchSortingComponent,
    ModSelectComponent,
    SearchFormPipe,

    CheckboxListComponent,
    CheckboxListDecorComponent,
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
        FlatSnippetModule,

        CommonModule,
        RouterModule.forChild([
            { path: 'flats', redirectTo: '/flats/search', pathMatch: 'full' },
            { path: 'flats/search', component: FlatsComponent, pathMatch: 'full' },
        ])
    ]
})

export class FlatsModule {}
