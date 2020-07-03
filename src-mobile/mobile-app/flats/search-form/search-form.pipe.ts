import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mySearchFormPipe',
    pure: false
})

export class SearchFormPipe implements PipeTransform  {

    constructor() {}

    transform(ButtonsValues: {value: string, mod: string}[], allButtons?: any): string {
        if (allButtons.length && ButtonsValues.length > 0 && ButtonsValues.length < allButtons.length - 1) {
            ButtonsValues.sort();
            let text = ButtonsValues.reduce((prevVal, currentVal, i) => {
                return prevVal + currentVal.value + (i + 1 < ButtonsValues.length ? ', ' : '');
            }, '');
            text = text.length > 15 ? text.slice(0, 13) + '..' : text;
            return text;
        }
        return 'Все дома';
    }
}
