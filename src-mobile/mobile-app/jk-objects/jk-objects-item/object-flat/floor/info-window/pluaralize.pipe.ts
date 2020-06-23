import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'myPluralizePipe',
})

export class PluralizePipe implements PipeTransform {

    public transform(num: number, word: string) {
        let forms = word.split('_');
        /* tslint:disable:max-line-length */
        return num % 10 === 1 && num % 100 !== 11 ? forms[0] : (num % 10 >= 2 && num % 10 <= 4 && (num % 100 < 10 || num % 100 >= 20) ? forms[1] : forms[2]);
    }
}
