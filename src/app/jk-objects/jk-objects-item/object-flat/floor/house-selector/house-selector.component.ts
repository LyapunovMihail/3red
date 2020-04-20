import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { HOUSEDATA } from './houseNumbers';
import { HOUSETRANSLATE } from '../../houseTranslate';
import { IObjectSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-house-selector',
    templateUrl: './house-selector.component.html',
    styleUrls: ['./house-selector.component.scss']
})

export class HouseSelectorComponent implements OnInit {

    public houseData: any[] = HOUSEDATA;
    public showCorpus = false;
    public houseTranslate = HOUSETRANSLATE;

    @Input() public housesBtnList: any[] = [];
    @Input() public floorCount: any[] = [];
    @Input() public jk: IObjectSnippet;
    @Input() public houseNumber: string;
    @Input() public sectionNumber: number;
    @Input() public floorNumber: number;

    constructor(
        public router: Router
    ) { }

    ngOnInit() {
        if (this.jk.mod !== 'МКВ') {
            this.housesBtnList.shift();
            this.houseData = this.housesBtnList;
        }
    }

    public navigateAll(num) {
        // Проверяем есть ли в схеме дома, на который мы хотим перейти, такие секция и этаж
        let section = Number(Object.keys(this.floorCount[num]).pop());
        if (section > this.sectionNumber) {
            section = this.sectionNumber;
        }
        let floor;
        if (this.floorCount[num][section].some((sFloor) => sFloor === this.floorNumber)) {
            floor = this.floorNumber;
        } else {
            floor = this.floorCount[num][section].find((item) => item);
        }

        this.router.navigate(['/objects/list/' + this.jk._id + '/flats/house/' + num + '/section/' + section + '/floor/' + floor]);
    }

    public navigateMKV(house) {
        // Проверяем есть ли в схеме дома, на который мы хотим перейти, такой этаж
        const floors = this.floorCount[house.house][house.section];
        const nextFloorMin = floors[floors.length - 1];
        const nextFloorMax = floors[0];
        let nextFloor = this.floorNumber;
        if ( nextFloorMin > this.floorNumber) {
            nextFloor = nextFloorMin;
        } else if (nextFloorMax < this.floorNumber) {
            nextFloor = nextFloorMax;
        } else {
            nextFloor = floors.find((item) => item);
        }

        this.router.navigate(['/objects/list/' + this.jk._id + '/flats/house/' + house.house + '/section/' + house.section + '/floor/' + nextFloor]);
    }
}
