import { Component, Input, OnInit } from '@angular/core';
import { SearchService } from '../object-flat/search/search.service';
import { IAddressItemFlat } from '../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { ITriggerSnippet } from '../../../../../serv-files/serv-modules/jk-objects/trigger-api/trigger.interfaces';

@Component({
    selector: 'app-object-item-trigger',
    templateUrl: 'object-trigger.component.html',
    styleUrls: [
        'object-trigger.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ SearchService ]
})

export class ObjectTriggerComponent implements OnInit {

    public triggerSnippets: ITriggerSnippet[] = [];

    @Input() public mod: string;
    @Input() public objectId: string;

    constructor(
        public flatsService: SearchService
    ) { }

    ngOnInit() {
        this.flatsService.getFlats({ mod: this.mod})
            .subscribe((flats) => {
                this.buildTriggersData(flats);
            });
    }

    private buildTriggersData(flats) {
        flats = flats.filter((flat: IAddressItemFlat) => flat.status === '4');
        if (flats.length) {
            for (let i = 0; i < 4; i++) {
                const filteredFlats = flats.filter((flat) => Number(flat.rooms) === i);
                if (filteredFlats.length) {
                    this.triggerSnippets[i] = {rooms: i, space: '', price: 0};
                    this.triggerSnippets[i].price = Math.min.apply(Math, filteredFlats.map((flat) => flat.price));
                    this.triggerSnippets[i].price = Number((this.triggerSnippets[i].price / 1000000).toFixed(2));

                    let spaceMin = Math.min.apply(Math, filteredFlats.map((flat) => flat.space));
                    spaceMin =  Math.round(spaceMin);

                    let spaceMax = Math.max.apply(Math, filteredFlats.map((flat) => flat.space));
                    spaceMax =  Math.round(spaceMax);

                    this.triggerSnippets[i].space = spaceMin + '-' + spaceMax + ' м²';
                }
            }
        }
    }
}
