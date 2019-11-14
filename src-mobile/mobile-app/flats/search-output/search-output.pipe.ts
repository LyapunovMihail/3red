import { FloorCount } from './floor-count';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mySearchOutputPipe'
})

export class SearchOutputPipe implements PipeTransform  {

    public floorCount = FloorCount;

    constructor() {}

    transform(v: any): number {
        if (v) {
            return this.floorCount[Number(v)][this.floorCount[Number(v)].length - 1];
        } else {
            return v;
        }
    }
}
