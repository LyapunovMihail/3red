import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFilterComponent } from './home-filter.component';
import { ModListComponent } from './mod-list/mod-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GHMRangeNumberModule } from '../../UI/ghm-range-number/ghm-range-number.module';
import { SearchFormPipe } from './search-form.pipe';

@NgModule({
    exports: [
        HomeFilterComponent,
        ModListComponent,
        SearchFormPipe
    ],
    declarations: [
        HomeFilterComponent,
        ModListComponent,
        SearchFormPipe
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        GHMRangeNumberModule
    ]
})
export class HomeFilterModule {
}
