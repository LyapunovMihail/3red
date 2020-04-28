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
    styleUrls: ['./ob-plan.component.scss'],
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
        });
    }

    public svgRouterLink(event: Event, url) {
        if (event) {
            event.preventDefault();
        }
        this.router.navigate([url]);
    }
}
