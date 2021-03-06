import { IAddressItemFlat, IFlatWithDiscount } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-floor-info-window',
    templateUrl: './info-window.component.html',
    styleUrls: ['./info-window.component.scss']
})

export class InfoWindowComponent {

    @Input() public infoWindow: IFlatWithDiscount;

    constructor() {}
}
