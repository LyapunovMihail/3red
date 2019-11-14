import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-search-sorting',
    templateUrl: './search-sorting.component.html',
    styleUrls: ['./search-sorting.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SearchSortingComponent),
            multi: true
        }
    ]
})

export class SearchSortingComponent {

    @Input() public counter;

    public activeSort: string;

    public sortList = [
        {
            name: 'price',
            text: 'По цене',
            value: false
        },
        {
            name: 'space',
            text: 'По площади',
            value: false
        },
        {
            name: 'floor',
            text: 'По этажу',
            value: false
        },
        {
            name: 'delivery',
            text: 'По сроку сдачи',
            value: false
        }
    ];

    constructor() {}

    public sortChange(name, value) {
        let el = this.sortList.findIndex((item) => item.name === name);
        this.activeSort = name;
        this.sortList[el].value = value;
        this.propagateChange(`${this.activeSort}_${(value ? '1' : '0')}`);
    }

    public writeValue(control) {
        if (control) {
            let name = (control).split('_')[0];
            let value = (control).split('_')[1];
            this.activeSort = (this.sortList.some((item) => item.name === name)) ? name : this.sortList[0].name;
            let el = this.sortList.findIndex((item) => item.name === name);
            if ( el >= 0 && (/^[0|1]$/).exec(value)) {
                this.sortList[el].value = (value === '1');
            }
        }
    }

    public propagateChange = (_: any) => {};

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}

}
