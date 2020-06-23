import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeFilterComponent } from './home-filter.component';
import { RouterModule } from '@angular/router';
import { SearchFormPipe } from './search-form.pipe';

@NgModule({
    exports: [
        HomeFilterComponent,
        SearchFormPipe
    ],
    declarations: [
        HomeFilterComponent,
        SearchFormPipe
    ],
    imports: [
        CommonModule,
        RouterModule
    ]
})
export class HomeFilterModule {
}
