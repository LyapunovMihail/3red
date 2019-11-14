import { Router } from '@angular/router';
import { SearchFlatsLinkHandlerService } from '../../commons/searchFlatsLinkHandler.service';
import { PLAN_SVG, IHousePlanItem } from './plan-svg';
import { PlanService } from './plan.service';
import { Component, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Component({
    selector: 'app-flats-plan-page',
    templateUrl: './plan.component.html',
    styleUrls: ['./plan.component.scss', '../flats.component.scss'],
    providers: [
        PlanService
    ]
})

export class PlanComponent implements OnInit {

    public showSearchWindow = false;
    public houses: IHousePlanItem[] = PLAN_SVG;
    public activeLink = '';

    constructor(
        public router: Router,
        private planService: PlanService,
        private searchFlatsLinkHandlerService: SearchFlatsLinkHandlerService
    ) {}

    ngOnInit() {
        this.searchFlatsLinkHandlerService.getShowSearchPanel().subscribe((show) => {
            this.showSearchWindow = show;
        });

        combineLatest(
            this.planService.getHouse(1),
            this.planService.getHouse(2),
            this.planService.getHouse(3),
            this.planService.getHouse(9)
        ).subscribe(([houseOne, houseTwo, houseThree, houseNine]) => {
            this.buildHousesData(0, houseOne);
            this.buildHousesData(1, houseTwo);
            this.buildHousesData(2, houseThree);
            this.buildHousesData(3, houseNine);
        });
    }

    private buildHousesData(i, flats) {
        flats = flats.filter((flat: IAddressItemFlat) => flat.status === '4');
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

    public svgRouterLink(event: Event, url) {
        if (event) {
            event.preventDefault();
        }
        this.router.navigate([url]);
    }
}
