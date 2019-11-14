import { Component, forwardRef, Input, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-search-form-sections',
    templateUrl: './sections-select.component.html',
    styleUrls: ['./sections-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SectionsSelectComponent),
            multi: true
        }
    ]
})

export class SectionsSelectComponent {

    public houses: number[] = [];

    constructor() {}

    public writeValue(control) {
        if (control && Array.isArray(control) && control.every((item) => typeof item === 'number')) {
            this.houses = [...control];
        }
    }

    public propagateChange = (_: any) => {};

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}

    public isActive(num) {
        return this.houses.some((item) => item === num);
    }

    public selectSection(num) {
        let index = this.houses.findIndex((item) => item === num);

        if (index >= 0) {
            this.houses.splice(index, 1);
        } else {
            this.houses.push(num);
        }
        this.propagateChange([...this.houses]);
    }
}
