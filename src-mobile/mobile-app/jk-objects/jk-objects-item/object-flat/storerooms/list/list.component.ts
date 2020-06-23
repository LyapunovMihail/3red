import { Component, OnInit } from '@angular/core';
import { ObjectFlatsService } from '../../object-flats.service';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { IObjectSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import set = Reflect.set;
import { JkObjectsListService } from '../../../../jk-objects-list/jk-objects-list.service';
import { StoreroomsService } from '../storerooms.service';

@Component({
    selector: 'app-storerooms-list-page',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss'],
    providers : [
        StoreroomsService,
        JkObjectsListService
    ]
})

export class ListComponent implements OnInit {

    public jk: IObjectSnippet;
    public storerooms: IAddressItemFlat[];
    public storeMas: any = [];
    public isParking = false;

    constructor(
        public service: StoreroomsService,
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
                            this.isParking = parking.length > 0;
                        },
                        (err) => console.error(err)
                    );

                    this.service.getFlats({ // запрос кладовых
                        mod: this.jk.mod,
                        type: 'КЛ'
                    }).subscribe(
                        (storerooms) => {
                            this.storerooms = storerooms;
                            this.parseResponse();
                        },
                        (err) => console.error(err)
                    );
                },
                (err) => console.error(err)
            );
    }

    public parseResponse() {

        this.storerooms.forEach((flat) => {
            // const match = parking.find((item) => item.section === flat.section && item.floor === flat.floor);
            let house = this.storeMas.find((item) => item.house === flat.house);
            if (!house) {
                house = { house: flat.house, stores: [] };
                this.storeMas.push(house);
            }

            const match = house.stores.find((item) => item.section === flat.section && item.floor === flat.floor);
            if (match) {
                match.price = match.price < flat.price ? match.price : flat.price;
            } else {
                house.stores.push({ section: flat.section, floor: flat.floor, price: flat.price});
            }
        });

        this.storeMas.forEach((item) => {
            item.stores.sort((a, b) => a.floor - b.floor);
            item.stores.sort((a, b) => a.section - b.section);
        });
        this.storeMas.sort((a, b) => a.house - b.house);
    }
}
