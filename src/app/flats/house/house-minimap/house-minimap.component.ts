import { ActivatedRoute, Router } from '@angular/router';
import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { FloorCount } from '../../floor/floor-count';

@Component({
    selector: 'app-house-minimap',
    templateUrl: './house-minimap.component.html',
    styleUrls: ['./house-minimap.component.scss']
})

export class HouseMinimapComponent implements OnInit, OnChanges {

    public floorCount = FloorCount;
    public houseNumbers: string[];
    @Input() public houseNumber: string;

    constructor(
        public router: Router,
        private activatedRoute: ActivatedRoute
    ) { }

    public ngOnInit() {
        this.houseNumbers = Object.keys(this.floorCount);
    }

    public ngOnChanges() {
        // Даём время прогрузиться компонентам поиска по параметрам чтобы они успели подписаться на событие смены queryparams и учли корпус выбранный при загрузке страницы дома
        setTimeout(() => {
            this.houseNavigate(this.houseNumber);
        }, 100);
    }

    public houseNavigate(num) {
        const queryParams = {...this.activatedRoute.snapshot.queryParams};
        queryParams.houses = num;
        this.router.navigate(['/flats/house/' + num], {queryParams});
    }
}
