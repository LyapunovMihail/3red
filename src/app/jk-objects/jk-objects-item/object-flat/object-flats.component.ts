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
    }
}
