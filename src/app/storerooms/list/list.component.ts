import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-storerooms-list-page',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.scss']
})

export class ListComponent implements OnInit {

    constructor() { }

    public ngOnInit() {
        const params = {type: 'КЛ', sort: 'floor_1'};
    }
}
