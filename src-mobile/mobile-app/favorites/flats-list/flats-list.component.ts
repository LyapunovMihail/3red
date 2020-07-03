import { Component, Input, OnInit } from '@angular/core';
import { WindowScrollLocker } from '../../commons/window-scroll-block';
import { IFlatWithDiscount } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Component({
    selector: 'app-flats-list',
    templateUrl: './flats-list.component.html',
    styleUrls: ['./flats-list.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})
export class FlatsListComponent implements OnInit {

    @Input() public flatsList: IFlatWithDiscount[] = [];

    public showApartmentWindow = false;
    public selectedFlatIndex: number;

    constructor(
        public windowScrollLocker: WindowScrollLocker
    ) {
    }

    ngOnInit() {
    }

    public openApartmentModal(index) {
        this.selectedFlatIndex = index;
        this.windowScrollLocker.block();
        this.showApartmentWindow = true;
    }
}
