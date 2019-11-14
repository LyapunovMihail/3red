import { Pipe, PipeTransform } from '@angular/core';
import { FormConfig } from './search-form.config';

@Pipe({
    name: 'mySearchFormPipe',
    pure: false
})

export class SearchFormPipe implements PipeTransform  {

    public housesList = FormConfig.housesList;

    constructor() {}

    transform(housesValues: string[]): string {
        if (housesValues.length > 0 && housesValues.length < 4) {
            housesValues.sort();
            const housesString = housesValues.reduce((prevVal, currentVal, i) => {
                return prevVal + this.housesList.find((item) => item.value === currentVal).name + (i + 1 < housesValues.length ? '; ' : '');
            }, '');
            return housesString;
        }
        return 'Все корпуса';
    }
}
