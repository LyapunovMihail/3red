import { IAddressItemFlat } from '../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-storeroom-info-window',
    templateUrl: './info-window.component.html',
    styleUrls: ['./info-window.component.scss']
})

export class InfoWindowComponent {

    @Input() public infoWindow: IAddressItemFlat;

    constructor() {}
}
