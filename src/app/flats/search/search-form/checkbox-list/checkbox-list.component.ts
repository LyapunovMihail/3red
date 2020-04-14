import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-search-checkbox-list',
    templateUrl: './checkbox-list.component.html',
    styleUrls: ['./checkbox-list.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxListComponent),
            multi: true
        }
    ]
})

export class CheckboxListComponent {

    @Input() public btnList: any[] = [];
    @Input() public name: string;

    public activeList: {value: string, mod: string}[] = [];

    constructor() {}

    public isChecked(val) {
        if (val === 'all') {
            return this.isCheckedAll();
        }
        return this.activeList.some((item) => item.value === val);
    }

    // Если проверяется состояние чекбокса 'выбрать всё' - проверяем равен ли массив значений кол-ву чекбоксов-1, если равен, то возвращаем тру, если нет - фэлс.
    // Так как значение 'выбрать всё' не попадает в массив значений, сделать проверку на наличие этого значения в массиве не удастся
    public isCheckedAll(): boolean {
        return this.activeList.length === this.btnList.length - 1;
    }

    public checkBtn(isChecked, btn) {
        const value = btn.value;
        if (value === 'all') {
            this.checkAll(isChecked);
            this.propagateChange(this.activeList);
            return;
        }

        if (isChecked && !this.activeList.some((item) => item.value === value)) {
            this.activeList.push({value, mod: btn.mod});
        } else {
            const index = this.activeList.findIndex((item) => item.value === value);
            if (index >= 0) {
                this.activeList.splice(index, 1);
            }
        }

        this.propagateChange(this.activeList);
    }

    // Если включили чекбокс 'выбрать всё' - добавляем в массив активных значений все значения кроме чекбокса 'выбрать всё',
    // если выключили - удаляем все значения из масиива
    public checkAll(isChecked) {
        this.btnList.forEach((item) => {
            if (item.value !== 'all') {
                if (isChecked && !this.activeList.some((entity) => entity.value === item.value)) {
                    this.activeList.push({ value: item.value, mod: item.mod });
                } else if (!isChecked) {
                    const index = this.activeList.findIndex((entity) => entity.value === item.value);
                    if (index >= 0) {
                        this.activeList.splice(index, 1);
                    }
                }
            }
        });
    }

    public writeValue(control) {
        if (control) {
            this.activeList = control;
        }
    }

    public propagateChange = (_: any) => {};

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
