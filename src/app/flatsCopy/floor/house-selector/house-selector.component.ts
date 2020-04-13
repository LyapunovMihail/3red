import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { HouseData, HOUSEDATA } from './houseNumbers';
import { FloorCount } from '../floor-count';
import { HOUSETRANSLATE } from '../../houseTranslate';

@Component({
    selector: 'app-house-selector',
    templateUrl: './house-selector.component.html',
    styleUrls: ['./house-selector.component.scss']
})

export class HouseSelectorComponent {

    public houseData: HouseData[] = HOUSEDATA;
    public floorCount = FloorCount;
    public showCorpus = false;
    public houseTranslate = HOUSETRANSLATE;

    @Input() public houseNumber: string;
    @Input() public sectionNumber: number;
    @Input() public floorNumber: number;

    constructor(
        public router: Router
    ) { }

    public houseNavigate(house: HouseData) {
        // Проверяем есть ли в схеме дома, на который мы хотим перейти, такой этаж
        const floors = this.floorCount[house.group][house.section];
        const nextFloorMin = floors[floors.length - 1];
        const nextFloorMax = floors[0];
        let nextFloor = this.floorNumber;
        if ( nextFloorMin > this.floorNumber) {
            nextFloor = nextFloorMin;
        } else if (nextFloorMax < this.floorNumber) {
            nextFloor = nextFloorMax;
        }

        this.router.navigate(['/flats/house/' + house.group + '/section/' + house.section + '/floor/' + nextFloor]);
    }
}
