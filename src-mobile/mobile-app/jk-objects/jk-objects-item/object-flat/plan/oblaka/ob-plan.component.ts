import {
    Router
} from '@angular/router';
import {
    PLAN_SVG,
    IPlanSvgItem
} from './ob-plan-svg';
import {
    ObPlanService
} from './ob-plan.service';
import {
    Component, Input,
    OnInit
} from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Component({
    selector: 'app-flats-ob-plan-page',
    templateUrl: './ob-plan.component.html',
    styleUrls: [
        '../plan.component.scss',
        './ob-plan.component.scss',
    ],
    providers: [
        ObPlanService
    ]
})

export class ObPlanComponent implements OnInit {

    public housesPlanSvg: IPlanSvgItem[] = PLAN_SVG;
    public links: string[] = this.planService.links();
    public activeLink = '';
    public houseOneFreeFlats: number;
    public houseTwoFreeFlats: number;

    @Input()
    public objectId: string;
    @Input()
    public mod: string;

    constructor(
        public router: Router,
        private planService: ObPlanService
    ) {}

    ngOnInit() {
        combineLatest(
            this.planService.getHouseOne(this.mod),
            this.planService.getHouseTwo(this.mod)
        ).subscribe(([houseOne, houseTwo]) => {
            this.houseOneFreeFlats = houseOne.filter((flat: IAddressItemFlat) => flat.status === '4').length;
            this.houseTwoFreeFlats = houseTwo.filter((flat: IAddressItemFlat) => flat.status === '4').length;
            this.buildHousesData(0, houseOne);
            this.buildHousesData(1, houseTwo);
        });
    }

    private buildHousesData(i, flats) {
        flats = flats.filter((flat: IAddressItemFlat) => flat.status === '4');
        const prices = flats.map( flat => flat.price);

        this.housesPlanSvg[i].freeFlats = flats.length;
        this.housesPlanSvg[i].minPrice = Number(((Math.min(...prices)) / 1000000).toFixed(2));
        if (flats.length) {
            this.housesPlanSvg[i].rooms.forEach((room)  => {
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
