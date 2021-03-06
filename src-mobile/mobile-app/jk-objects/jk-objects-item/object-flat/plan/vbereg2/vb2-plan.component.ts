import { Router } from '@angular/router';
import { PLAN_SVG, IHousePlanItem } from './vb2-plan-svg';
import { Vb2PlanService } from './vb2-plan.service';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Component({
    selector: 'app-flats-vb2-plan-page',
    templateUrl: './vb2-plan.component.html',
    styleUrls: [
        '../plan.component.scss',
        './vb2-plan.component.scss',
    ],
    providers: [
        Vb2PlanService
    ]
})

export class Vb2PlanComponent implements OnInit {

    @Input()
    public objectId: string;
    @Input()
    public mod: string;
    public houses: IHousePlanItem[] = PLAN_SVG;
    public activeLink = '';

    constructor(
        public router: Router,
        private planService: Vb2PlanService
    ) {}

    ngOnInit() {

        combineLatest(
            this.planService.getHouse('1', this.mod),
            this.planService.getHouse('2', this.mod),
            this.planService.getHouse('3', this.mod),
            this.planService.getHouse('4', this.mod),
            this.planService.getHouse('5', this.mod),
            this.planService.getHouse('6', this.mod),
            this.planService.getHouse('7', this.mod),
            this.planService.getHouse('8', this.mod)
        ).subscribe(([houseOne, houseTwo, houseThree, houseFour, houseFive, houseSix, houseSeven, houseEight]) => {
            this.buildHousesData(0, houseOne);
            this.buildHousesData(1, houseTwo);
            this.buildHousesData(2, houseThree);
            this.buildHousesData(3, houseFour);
            this.buildHousesData(4, houseFive);
            this.buildHousesData(5, houseSix);
            this.buildHousesData(6, houseSeven);
            this.buildHousesData(7, houseEight);
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
