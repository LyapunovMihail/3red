import { IAddressItemFlat } from '../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';

@Component({
    selector: 'app-parking-request-window',
    templateUrl: './request-window.component.html',
    styleUrls: ['./request-window.component.scss']
})

export class RequestWindowComponent {

    @Input() public parkingData: IAddressItemFlat;
    @Input() public isOpen: boolean = false;
    @Output() public close = new EventEmitter();

    public isCreditFormOpen: boolean = false;
    public isReserveFormOpen: boolean = false;

    constructor(
        public windowScrollLocker: WindowScrollLocker
    ) {}
}
