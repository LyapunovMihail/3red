import { Router } from '@angular/router';
import { PLAN_SVG, IHousePlanItem } from './mkv-plan-svg';
import { MkvPlanService } from './mkv-plan.service';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { PlanService } from '../plan.service';

@Component({
    selector: 'app-flats-mkv-plan-page',
    templateUrl: './mkv-plan.component.html',
    styleUrls: [ '../plan.component.scss' ],
    providers: [
        MkvPlanService
    ]
})

export class MkvPlanComponent implements OnInit {

    @Input()
    public objectId: string;
    @Input()
    public mod: string;
    public houses: IHousePlanItem[] = PLAN_SVG;
    public activeLink = '';

    constructor(
        public router: Router,
        private planService: MkvPlanService,
        public service: PlanService
    ) {}

    ngOnInit() {

        combineLatest(
            this.planService.getHouse('1a', '1', this.mod),
            this.planService.getHouse('1a', '2', this.mod),
            this.planService.getHouse('1a', '3', this.mod),
            this.planService.getHouse('1a', '4', this.mod),
            this.planService.getHouse('1a', '5', this.mod),
            this.planService.getHouse('1a', '6', this.mod),
            this.planService.getHouse('1a', '7', this.mod),
            this.planService.getHouse('1b', '1', this.mod),
            this.planService.getHouse('1b', '2', this.mod),
            this.planService.getHouse('1b', '3', this.mod),
            this.planService.getHouse('1b', '4', this.mod),
            this.planService.getHouse('1b', '5', this.mod),
            this.planService.getHouse('2a', '1', this.mod),
            this.planService.getHouse('2b', '1', this.mod),
            this.planService.getHouse('2b', '2', this.mod),
            this.planService.getHouse('2b', '3', this.mod),
            this.planService.getHouse('2b', '4', this.mod),
            this.planService.getHouse('2b', '5', this.mod),
            this.planService.getHouse('2b', '6', this.mod),
        ).subscribe(([houseOne, houseTwo, houseThree, houseFour, houseFive, houseSix, houseSeven, houseEight, houseNine,
                                 houseTen, houseEleven, houseTwelf, houseThirteen, houseFourteen, houseFifteen, houseSixteen, houseSeventeen, houseEighteen, houseNineteen]) => {
            this.buildHousesData(0, houseOne);
            this.buildHousesData(1, houseTwo);
            this.buildHousesData(2, houseThree);
            this.buildHousesData(3, houseFour);
            this.buildHousesData(4, houseFive);
            this.buildHousesData(5, houseSix);
            this.buildHousesData(6, houseSeven);
            this.buildHousesData(7, houseEight);
            this.buildHousesData(8, houseNine);
            this.buildHousesData(9, houseTen);
            this.buildHousesData(10, houseEleven);
            this.buildHousesData(11, houseTwelf);
            this.buildHousesData(12, houseThirteen);
            this.buildHousesData(13, houseFourteen);
            this.buildHousesData(14, houseFifteen);
            this.buildHousesData(15, houseSixteen);
            this.buildHousesData(16, houseSeventeen);
            this.buildHousesData(17, houseEighteen);
            this.buildHousesData(18, houseNineteen);
        });
    }

    private buildHousesData(i, flats) {
        flats = flats.filter((flat: IAddressItemFlat) => flat.status === '4' || flat.status === '1');
        this.houses[i].freeFlats = flats.length;
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

    public svgRouterLink(event: Event, url, house) {
        if (event) {
            event.preventDefault();
        }
        this.router.navigate([url], {queryParams: {houses: house}});
    }
}
