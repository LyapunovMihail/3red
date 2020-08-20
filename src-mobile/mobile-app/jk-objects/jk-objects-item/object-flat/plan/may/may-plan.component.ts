import { Router } from '@angular/router';
import { PLAN_SVG, IHousePlanItem } from './may-plan-svg';
import { MayPlanService } from './may-plan.service';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { PlanService } from '../plan.service';

@Component({
    selector: 'app-flats-may-plan-page',
    templateUrl: './may-plan.component.html',
    styleUrls: [ '../plan.component.scss' ],
    providers: [
        MayPlanService
    ]
})

export class MayPlanComponent implements OnInit {
    @Input()
    public objectId: string;
    @Input()
    public mod: string;
    public houses: IHousePlanItem[] = PLAN_SVG;
    public activeLink = '';

    constructor(
        public router: Router,
        private planService: MayPlanService,
        public service: PlanService
    ) {}

    ngOnInit() {
        combineLatest(
            this.planService.getHouse('11', this.mod),
            this.planService.getHouse('12', this.mod),
            this.planService.getHouse('13', this.mod),
            this.planService.getHouse('14', this.mod),
            this.planService.getHouse('15', this.mod),
            this.planService.getHouse('16', this.mod),
            this.planService.getHouse('17', this.mod),
            this.planService.getHouse('18', this.mod),
            this.planService.getHouse('19', this.mod),
            this.planService.getHouse('20', this.mod),
            this.planService.getHouse('21', this.mod),
        ).subscribe(([ houseOne, houseTwo, houseThree, houseFour, houseFive, houseSix, houseSeven, houseEight, houseNine, houseTen, houseEleven]) => {
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

    public svgRouterLink(event: Event, url, house) {
        if (event) {
            event.preventDefault();
        }
        this.router.navigate([url], {queryParams: {houses: house}});
    }
}
