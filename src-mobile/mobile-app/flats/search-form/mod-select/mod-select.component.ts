import { Component, forwardRef, Input, OnChanges, OnInit } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-search-mod-select',
    templateUrl: './mod-select.component.html',
    styleUrls: ['./mod-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ModSelectComponent),
            multi: true
        }
    ]
})

export class ModSelectComponent implements OnInit, OnChanges {

    @Input() public modList: { name: string, value: string}[];
    @Input() public value;

    constructor(
    ) { }

    public ngOnInit() {
    }

    public ngOnChanges(changes): void {
        if (this.value === undefined) {
            this.value = '';
        }
    }

    public modNavigate(num) {
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
