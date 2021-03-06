import { Router } from '@angular/router';
import { PLAN_SVG, IHousePlanItem } from './nt-plan-svg';
import { NtPlanService } from './nt-plan.service';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Component({
    selector: 'app-flats-nt-plan-page',
    templateUrl: './nt-plan.component.html',
    styleUrls: [
        '../plan.component.scss',
        './nt-plan.component.scss',
    ],
    providers: [
        NtPlanService
    ]
})

export class NtPlanComponent implements OnInit {

    @Input()
    public objectId: string;
    @Input()
    public mod: string;
    public houses: IHousePlanItem[] = PLAN_SVG;
    public activeLink = '';

    constructor(
        public router: Router,
        private planService: NtPlanService
    ) {}

    ngOnInit() {

        combineLatest(
            this.planService.getHouse('1', this.mod),
            this.planService.getHouse('2', this.mod),
            this.planService.getHouse('3', this.mod),
            this.planService.getHouse('9', this.mod)
        ).subscribe(([houseOne, houseTwo, houseThree, houseNine]) => {
            this.buildHousesData(0, houseOne);
            this.buildHousesData(1, houseTwo);
            this.buildHousesData(2, houseThree);
            this.buildHousesData(3, houseNine);
        });
    }

    private buildHousesData(i, flats) {
        flats = flats.filter((flat: IAddressItemFlat) => flat.status === '4' || flat.status === '1');
        const prices = flats.map( flat => flat.price);
        this.houses[i].freeFlats = flats.length;
        this.houses[i].minPrice = Number(((Math.min(...prices)) / 1000000).toFixed(2));
        if (flats.length) {
            this.houses[i].rooms.forEach((room)  => {
                room.minPrice = flats.filter((flat) => flat.rooms === room.name)
                    .reduce((minPrice, flat) => {
                        return flat.price < minPrice ? flat.price : minPrice;
                    }, 9999999999);
                room.minPrice = room.minPrice === 9999999999 ? 0 : Number((room.minPrice / 1000000).toFixed(2));
            });
        }
    }

    public svgRouterLink(event: Event, url) {
        if (event) {
            event.preventDefault();
        }
        this.router.navigate([url]);
    }

    public parseText(num) {

        num = Math.abs(num) % 100;
        const words = ['????????????????', '????????????????', '??????????????'];
        const sum = num % 10;

        if (num > 10 && num < 20) { return words[2]; }
        if (sum > 1 && sum < 5) { return words[1]; }
        if (sum === 1) { return words[0]; }
        return words[2];
    }
}
