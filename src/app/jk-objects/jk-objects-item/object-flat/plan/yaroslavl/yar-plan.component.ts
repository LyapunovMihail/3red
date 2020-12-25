import { Router } from '@angular/router';
import { PLAN_SVG, IHousePlanItem } from './yar-plan-svg';
import { YarPlanService } from './yar-plan.service';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { PlanService } from '../plan.service';

@Component({
    selector: 'app-flats-yar-plan-page',
    templateUrl: './yar-plan.component.html',
    styleUrls: [ '../plan.component.scss' ],
    providers: [
        YarPlanService
    ]
})

export class YarPlanComponent implements OnInit {

    @Input()
    public objectId: string;
    @Input()
    public mod: string;
    public houses: IHousePlanItem[] = PLAN_SVG;
    public activeLink = '';

    constructor(
        public router: Router,
        private planService: YarPlanService,
        public service: PlanService
    ) {}

    ngOnInit() {
        combineLatest(
            this.planService.getHouse('1', this.mod),
            this.planService.getHouse('2', this.mod)
        ).subscribe(([ houseOne, houseTwo ]) => {
            this.buildHousesData(0, houseOne);
            this.buildHousesData(1, houseTwo);
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
            this.houses[i].rooms = this.houses[i].rooms.filter(item => item.minPrice !== 0);
        }
        console.log('this.houses: ', this.houses);
    }

    public svgRouterLink(event: Event, url, house) {
        if (event) {
            event.preventDefault();
        }
        this.router.navigate([url], {queryParams: {houses: house}});
    }
}
