import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ObjectFlatsService } from '../object-flats.service';

@Component({
    selector: 'app-storerooms-page',
    templateUrl: './storerooms.component.html',
    styleUrls: ['./storerooms.component.scss'],
    providers : []
})

export class StoreroomsComponent implements OnInit {

    constructor(
        private activatedRoute: ActivatedRoute,
        private objectFlatsService: ObjectFlatsService
    ) { }

    ngOnInit() {
        this.objectFlatsService.setId(this.activatedRoute.snapshot.params.id);
    }
}
