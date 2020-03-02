import { Component, OnInit } from '@angular/core';
import { FormConfig } from '../../../flats/search/search-form/search-form.config';

@Component({
    selector: 'app-object-item-filter',
    templateUrl: 'object-filter.component.html',
    styleUrls: ['object-filter.component.scss']
})

export class ObjectFilterComponent implements OnInit {

    public config = FormConfig;

    constructor() { }

    ngOnInit() { }
}
