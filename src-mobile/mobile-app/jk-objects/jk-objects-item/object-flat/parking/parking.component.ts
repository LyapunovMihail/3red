import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectFlatsService } from '../object-flats.service';

@Component({
    selector: 'app-parking-page',
    templateUrl: './parking.component.html',
    styleUrls: ['./parking.component.scss'],
    providers : []
})

export class ParkingComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private objectFlatsService: ObjectFlatsService
    ) { }

    ngOnInit() {
        this.objectFlatsService.setId(this.activatedRoute.snapshot.params.id);
    }
}
