import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-search-checkbox-list-popup',
    templateUrl: './checkbox-list-popup.component.html',
    styleUrls: ['./checkbox-list-popup.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => CheckboxListPopupComponent),
            multi: true
        }
    ]
})

export class CheckboxListPopupComponent {

    @Input() public btnList: any[] = [];
    @Input() public name: string;

    public activeList: {value: string, mod: string}[] = [];

    constructor() {}

    public isChecked(btn) {
        if (btn.value === 'all') {
            return this.isCheckedAll();
        }
        return this.activeList.some((item) => item.value === btn.value && item.mod === btn.mod);
    }

    // Если проверяется состояние чекбокса 'выбрать всё' - проверяем равен ли массив значений кол-ву чекбоксов-1, если равен, то возвращаем тру, если нет - фэлс.
    // Так как значение 'выбрать всё' не попадает в массив значений, сделать проверку на наличие этого значения в массиве не удастся
    public isCheckedAll(): boolean {
        return this.activeList.length === this.btnList.filter((item) => !item.jk).length - 1; // При проверке убираем из массива кнопок те что с названием жк
    }

    public checkBtn(isChecked, btn) {
        const value = btn.value;
        if (value === 'all') {
            this.checkAll(isChecked);
            this.propagateChange(this.activeList);
            return;
        }

        if (isChecked && !this.activeList.some((item) => item.value === value && item.mod === btn.mod)) {
            this.activeList.push({value, mod: btn.mod});
        } else {
            const index = this.activeList.findIndex((item) => item.value === value && item.mod === btn.mod);
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
            if (item.value !== 'all' && !item.jk) {
                if (isChecked && !this.activeList.some((entity) => entity.value === item.value && entity.mod === item.mod)) {
                    this.activeList.push({ value: item.value, mod: item.mod });
                } else if (!isChecked) {
                    const index = this.activeList.findIndex((entity) => entity.value === item.value && entity.mod === item.mod);
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
