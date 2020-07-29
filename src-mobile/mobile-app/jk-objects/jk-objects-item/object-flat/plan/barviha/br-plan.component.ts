import { Router } from '@angular/router';
import { PLAN_SVG, IHousePlanItem } from './br-plan-svg';
import { BrPlanService } from './br-plan.service';
import { Component, Input, OnInit } from '@angular/core';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { PlanService } from '../plan.service';

@Component({
    selector: 'app-flats-br-plan-page',
    templateUrl: './br-plan.component.html',
    styleUrls: [ '../plan.component.scss' ],
    providers: [
        BrPlanService
    ]
})

export class BrPlanComponent implements OnInit {

    @Input()
    public objectId: string;
    @Input()
    public mod: string;
    @Input()
    public menuMod: string;

    @Input() public storerooms;
    @Input() public parking;

    public words = [
        ['кладовая', 'кладовые', 'кладовых'],
        ['машиноместо', 'машиноместа', 'машиномест'],
    ];
    public houses: IHousePlanItem[] = PLAN_SVG;
    public activeLink = '';
    public tooltipStyle = {
        top: '',
        bottom: '',
        zIndex: '',
        opacity: ''
    };

    constructor(
        public router: Router,
        private planService: BrPlanService,
        public service: PlanService
    ) {}

    ngOnInit() {

        combineLatest(
            this.planService.getHouse('1', this.mod)
        ).subscribe(([ houseOne ]) => {
            this.buildHousesData(0, houseOne);
        });
    }

    private buildHousesData(i, flats) {
        flats = flats.filter((flat: IAddressItemFlat) => flat.type === 'КВ' && flat.status === '4' || flat.status === '1');
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
        if (this.storerooms && this.storerooms.length) {
            this.houses[i].freeStorage = this.storerooms.filter( flat => flat.status === '4').length;
            this.houses[i].storageMinPrice = Math.min.apply(Math, this.storerooms.map( flat => flat.price )) > 1000000 ?
                Number((Math.min(...this.storerooms.map( flat => flat.price )) / 1000000).toFixed(0))
                : Number((Math.min(...this.storerooms.map( flat => flat.price )) / 1000).toFixed(0));
        }
        if (this.parking && this.parking.length) {
            this.houses[i].freeParking = this.parking.filter( flat => flat.status === '4').length;
            this.houses[i].parkingMinPrice = Math.min.apply(Math, this.parking.map( flat => flat.price )) > 1000000 ?
                Number((Math.min(...this.parking.map( flat => flat.price )) / 1000000).toFixed(0))
                : Number((Math.min(...this.parking.map( flat => flat.price )) / 1000).toFixed(0));
        }
    }

    public svgRouterLink(event: Event, url) {
        if (event) { event.preventDefault(); }

        if (this.menuMod === 'flats') {
            this.router.navigate([`/objects/list/${this.objectId}/flats/house/${url}`], { queryParams: { houses: url }});
        }
        if (this.menuMod === 'storerooms') {
            this.router.navigate([`/objects/list/${this.objectId}/storerooms`]);
        }
        if (this.menuMod === 'parking') {
            this.router.navigate([`/objects/list/${this.objectId}/parking`]);
        }
    }
}
