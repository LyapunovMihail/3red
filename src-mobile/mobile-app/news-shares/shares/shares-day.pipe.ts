import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sharesDayPipe'
})
export class SharesDayPipe implements PipeTransform {

    transform(value: number): string {
        const valueArr = value.toString().split('');
        let day;

        if (valueArr[valueArr.length - 1] === '1' && value !== 11) {
            day = 'день';
        } else if (
            (valueArr[valueArr.length - 1] === '2' && value !== 12)
            || (valueArr[valueArr.length - 1] === '3' && value !== 13)
            || (valueArr[valueArr.length - 1] === '4' && value !== 14)
        ) {
            day = 'дня';
        } else {
            day = 'дней';
        }
        return `${value} ${day}`;
    }

}
