import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { FloorCount } from '../floor-count';

@Component({
    selector: 'app-house-selector',
    templateUrl: './house-selector.component.html',
    styleUrls: ['./house-selector.component.scss']
})

export class HouseSelectorComponent {

    public floorCount = FloorCount;
    @Input() public houseNumber: number;
    @Input() public sectionNumber: number;
    @Input() public floorNumber: number;

    constructor(
        public router: Router
    ) { }


    public houseNavigate(num) {
        // Проверяем есть ли в схеме дома, на который мы хотим перейти, такие секция и этаж
        let section = Number(Object.keys(this.floorCount[num]).pop());
        if (section > this.sectionNumber) {
            section = this.sectionNumber;
        }
        let floor = this.floorCount[num][section][0];
        if (floor > this.floorNumber) {
            floor = this.floorNumber;
        }

        this.router.navigate(['/flats/house/' + num + '/section/' + section + '/floor/' + floor]);
    }

}
