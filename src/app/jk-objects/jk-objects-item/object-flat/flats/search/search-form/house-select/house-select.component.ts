import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-search-house-select',
    templateUrl: './house-select.component.html',
    styleUrls: ['./house-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => HouseSelectComponent),
            multi: true
        }
    ]
})

export class HouseSelectComponent implements OnInit {

    @Input() public housesList: { name: string, value: string}[];
    @Input() public value;

    constructor(
    ) { }

    public ngOnInit() {
    }

    public houseNavigate(num) {
        num = num === this.value ? '1a,1b,2a,2b' : num;
        this.propagateChange(num);
    }

    public writeValue() {
    }

    public propagateChange = (_: any) => {};

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
