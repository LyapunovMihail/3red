import { Component, OnInit } from '@angular/core';
import { ObjectFlatsService } from './object-flats.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-flats-page',
    templateUrl: './object-flats.component.html',
    styleUrls: ['./object-flats.component.scss']
})

export class ObjectFlatsComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private objectFlatsService: ObjectFlatsService
    ) {}

    ngOnInit() {
        this.objectFlatsService.setId(this.activatedRoute.snapshot.params.id);

        const flats = [];
        const parking = [];

        flats.forEach((flat) => {
            // const match = parking.find((item) => item.section === flat.section && item.floor === flat.floor);
            let ind;
            let house = parking.find((item, i) => item.house === flat.house);
            if (!house) {
                house = { house: flat.house, flats: [] };
                parking.push(house);
            }

            const match = house.flats.find((item) => item.section === flat.section && item.floor === flat.floor);
            if (match) {
                match.price = match.price < flat.price ? match.price : flat.price;
            } else {
                house.flats.push({ section: match.section, floor: match.floor, price: match.price});
            }
        });

        parking.forEach((item) => {
            item.flats.sort((a, b) => a.section - b.section);
            item.flats.sort((a, b) => a.floor - b.floor);
        });
        parking.sort((a, b) => a.house - b.house);
    }
}
