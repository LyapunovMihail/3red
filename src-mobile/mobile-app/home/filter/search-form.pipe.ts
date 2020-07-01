import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mySearchFormPipe',
    pure: false
})

export class SearchFormPipe implements PipeTransform  {

    constructor() {}

    transform(ButtonsValues: string[], allButtons?: any): string {
        if (allButtons.length && ButtonsValues.length > 0 && ButtonsValues.length < allButtons.length - 1) {
            ButtonsValues.sort();
            let text = ButtonsValues.reduce((prevVal, currentVal, i) => {
                return prevVal + allButtons.find((item) => item.value === currentVal).name + (i + 1 < ButtonsValues.length ? ', ' : '');
            }, '');
            text = text.length > 20 ? text.slice(0, 18) + '..' : text;
            return text;
        }
        return 'Все комплексы';
    }
}
