import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mySearchFormPipe',
    pure: false
})

export class SearchFormPipe implements PipeTransform  {

    constructor() {}

    transform(housesValues: string[], allButtons?: any): string {
        if (allButtons.length && housesValues.length > 0 && housesValues.length < allButtons.length - 1) {
            housesValues.sort();
            let housesString = housesValues.reduce((prevVal, currentVal, i) => {
                return prevVal + currentVal + (i + 1 < housesValues.length ? '; ' : '');
            }, '');
            housesString = housesString.length > 15 ? housesString.slice(0, 13) + '..' : housesString;
            return housesString;
        }
        return 'Все корпуса';
    }
}
