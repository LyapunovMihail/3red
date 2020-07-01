import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../object-flat/search/search.service';
import { IAddressItemFlat } from '../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Component({
    selector: 'app-object-item-storage',
    templateUrl: 'object-storage.component.html',
    styleUrls: [
        'object-storage.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [SearchService]
})

export class ObjectStorageComponent implements OnInit {

    public parking = 0;
    public storerooms = 0;

    @Input() public mod: string;
    @Input() public objectId: string;

    constructor(
        public flatsService: SearchService
    ) {}

    ngOnInit() {
        this.flatsService.getFlats({ mod: this.mod, type: 'КЛ,ММ'})
            .subscribe((flats) => {
                this.buildTriggersData(flats);
            });
    }

    private buildTriggersData(flats) {
        flats = flats.filter((flat: IAddressItemFlat) => flat.status === '4');
        if (flats.length) {
            let filteredFlats = flats.filter((flat) => flat.type === 'ММ');
            if (filteredFlats.length) {
                this.parking = Math.min.apply(Math, filteredFlats.map((flat) => flat.price));
            }

            filteredFlats = flats.filter((flat) => flat.type === 'КЛ');
            if (filteredFlats.length) {
                this.storerooms = Math.min.apply(Math, filteredFlats.map((flat) => flat.price));
            }
        }
    }
}
