import { Component, OnInit } from '@angular/core';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { FlatsService } from '../../flats/flats.service';

interface ITriggerSnippet {
    rooms: number;
    space: string;
    price: number;
}

@Component({
    selector: 'app-home-trigger',
    templateUrl: 'home-trigger.component.html',
    styleUrls: ['home-trigger.component.scss'],
    providers: [
        FlatsService
    ]
})

export class HomeTriggerComponent implements OnInit {

    public triggersData: ITriggerSnippet[] = [];

    constructor(
        public flatsService: FlatsService
    ) { }

    ngOnInit() {
        this.flatsService.getObjects({})
            .subscribe((data) => {
                this.buildTriggersData(data.flats);
            });
    }

    private buildTriggersData(flats) {
        flats = flats.filter((flat: IAddressItemFlat) => flat.status === '4');
        if (flats.length) {
            for (let i = 0; i < 4; i++) {
                const filteredFlats = flats.filter((flat) => flat.rooms === i);
                this.triggersData[i] = {rooms: i, space: '', price: 0};
                this.triggersData[i].price = filteredFlats.reduce((minPrice, flat) => {
                        return flat.price < minPrice ? flat.price : minPrice;
                    }, 9999999999);
                this.triggersData[i].price = Number((this.triggersData[i].price / 1000000).toFixed(2));

                let spaceMin = filteredFlats.reduce((minSpace, flat) => {
                        return flat.space < minSpace ? flat.space : minSpace;
                    }, 9999999999);
                spaceMin =  Math.round(spaceMin);

                let spaceMax = filteredFlats.reduce((maxSpace, flat) => {
                    return flat.space > maxSpace ? flat.space : maxSpace;
                }, 0);
                spaceMax =  Math.round(spaceMax);

                this.triggersData[i].space = spaceMin + '-' + spaceMax + ' м²';
            }

        }
    }
}
