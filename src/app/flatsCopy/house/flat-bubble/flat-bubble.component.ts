import { IFlatWithDiscount } from '../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { PlatformDetectService } from './../../../platform-detect.service';
import { Component, Input } from '@angular/core';

export interface IFlatBubbleCoordinates {
    top: number;
    left: number;
}

@Component({
    selector: 'app-flats-flat-bubble',
    templateUrl: './flat-bubble.component.html',
    styleUrls: ['./flat-bubble.component.scss']
})

export class FlatBubbleComponent {

    @Input() public coords: IFlatBubbleCoordinates;
    @Input() public bubbleData: IFlatWithDiscount;
    @Input() public showBubble: boolean;

    constructor(
        public platform: PlatformDetectService,
    ) {}
}
