import { Injectable } from '@angular/core';
import { SEGMENTSCOLOR } from './segments-color';
declare let $: any;

@Injectable()

export class DynamicLinkListService {

    public segmentsColor: any = SEGMENTSCOLOR;

    constructor(  ) {}

    public fillReadySegments(objectArray, isMinimap: boolean) {
        const prefix = isMinimap ? 'minimap-' : '';

        objectArray.forEach((obj) => {
            const ready = obj.ready.value || obj.ready;
            const numberOfSegments = Math.ceil(ready / 10);
            const color = this.segmentsColor[numberOfSegments];

            for (let i = 1; i <= numberOfSegments; i++) {
                $(`#${prefix}${obj._id}-segment-${i}`).css({fill : color});
            }
        });
    }

}
