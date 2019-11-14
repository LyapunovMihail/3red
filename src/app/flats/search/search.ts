import { CheckboxListComponent } from './search-form/checkbox-list/checkbox-list.component';
import { SearchComponent } from './search.component';
import { SearchFormComponent } from './search-form/search-form.component';
import { SearchOutputComponent } from './search-output/search-output.component';
import { SearchSortingComponent } from './search-form/sorting/sorting.component';
import { SearchFormPipe } from './search-form/search-form.pipe';
import { SearchOutputPipe } from './search-output/search-output.pipe';
import { BitNumberPipe } from './search-output/bit-number.pipe';

export const SearchComponents = [
    SearchComponent,
    SearchFormComponent,
    SearchOutputComponent,
    SearchSortingComponent,
    SearchOutputPipe,
    SearchFormPipe,
    BitNumberPipe,
    CheckboxListComponent
];
