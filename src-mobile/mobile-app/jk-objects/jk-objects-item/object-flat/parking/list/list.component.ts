import { Component, OnInit } from '@angular/core';
import { IObjectSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { JkObjectsListService } from '../../../../jk-objects-list/jk-objects-list.service';
import { ObjectFlatsService } from '../../object-flats.service';
import { ParkingService } from '../parking.service';

@Component({
    selector: 'app-parking-list-page',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers : [
        ParkingService,
        JkObjectsListService
    ]
})

export class ListComponent implements OnInit {

    public jk: IObjectSnippet;
    public parking: IAddressItemFlat[];
    public parkMas: any = [];
    public isStorerooms = false;

    constructor(
        public service: ParkingService,
        private jkObjectsItemService: JkObjectsListService,
        private objectFlatsService: ObjectFlatsService
    ) { }

    public ngOnInit() {
        this.jkObjectsItemService.getSnippets(this.objectFlatsService.getId())
            .subscribe(
                (data) => {
                    this.jk = data[0];

                    this.service.getFlats({ // запрос машиномест
                        mod: this.jk.mod,
                        type: 'ММ'
                    }).subscribe(
                        (parking) => {
                            this.parking = parking;
                            this.parseResponse();
                        },
                        (err) => console.error(err)
                    );

                    this.service.getFlats({ // запрос кладовых
                        mod: this.jk.mod,
                        type: 'КЛ'
                    }).subscribe(
                        (storerooms) => {
                            this.isStorerooms = storerooms.length > 0;
                        },
                        (err) => console.error(err)
                    );
                },
                (err) => console.error(err)
            );
    }

    public parseResponse() {

        this.parking.forEach((flat) => {
            // const match = parking.find((item) => item.section === flat.section && item.floor === flat.floor);
            let house = this.parkMas.find((item) => item.house === flat.house);
            if (!house) {
                house = { house: flat.house, parks: [] };
                this.parkMas.push(house);
            }

            const match = house.parks.find((item) => item.section === flat.section && item.floor === flat.floor);
            if (match) {
                match.price = match.price < flat.price ? match.price : flat.price;
            } else {
                house.parks.push({ section: flat.section, floor: flat.floor, price: flat.price});
            }
        });

        this.parkMas.forEach((item) => {
            item.parks.sort((a, b) => a.floor - b.floor);
            item.parks.sort((a, b) => a.section - b.section);
        });
        this.parkMas.sort((a, b) => a.house - b.house);
    }
}
