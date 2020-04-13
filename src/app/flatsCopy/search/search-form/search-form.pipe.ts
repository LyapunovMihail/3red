import { Pipe, PipeTransform } from '@angular/core';
import { FormConfig } from './search-form.config';

@Pipe({
    name: 'mySearchFormPipe',
    pure: false
})

export class SearchFormPipe implements PipeTransform  {

    public housesList = FormConfig.housesList;

    constructor() {}

    transform(ButtonsValues: string[], allButtonsLength?: number): string {
        if (ButtonsValues.length > 0 && ButtonsValues.length < allButtonsLength) {
            ButtonsValues.sort();
            let housesString = ButtonsValues.reduce((prevVal, currentVal, i) => {
                return prevVal + this.housesList.find((item) => item.value === currentVal).name + (i + 1 < ButtonsValues.length ? '; ' : '');
            }, '');
            housesString = housesString.length > 15 ? housesString.slice(0, 13) + '..' : housesString;
            return housesString;
        }
        return 'Все корпуса';
    }
}
