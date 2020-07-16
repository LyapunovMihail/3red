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

    @Input() public btnList: { name: string, value: string}[];
    @Input() public value;

    constructor(
    ) { }

    public ngOnInit() {
    }

    public houseNavigate(btn) {
        this.propagateChange(btn.value);
    }

    public writeValue() {
    }

    public propagateChange = (_: any) => {};

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
