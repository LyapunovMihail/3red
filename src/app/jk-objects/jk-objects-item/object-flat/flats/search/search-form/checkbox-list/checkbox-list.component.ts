import { Component, forwardRef, Input, EventEmitter, Output } from '@angular/core';
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
    @Output() public decoration = new EventEmitter<any>();

    public activeList: string[] = [];

    constructor() {}

    public isChecked(val) {
        if (val === 'all') {
            return this.isCheckedAll();
        }
        return this.activeList.some((item) => item === val);
    }

    // Если проверяется состояние чекбокса 'выбрать всё' - проверяем равен ли массив значений кол-ву чекбоксов-1, если равен, то возвращаем тру, если нет - фэлс.
    // Так как значение 'выбрать всё' не попадает в массив значений, сделать проверку на наличие этого значения в массиве не удастся
    public isCheckedAll(): boolean {
        return this.activeList.length === this.btnList.length;
    }

    public checkBtn(event) {
        const value = event.target.value;
        if (value === 'all') {
            this.checkAll(event);
            this.propagateChange(this.activeList);
            return;
        }

        if (event.target.checked && !this.activeList.some((item) => item === value)) {
            this.activeList.push(value);
            this.outputDecoration(this.activeList);
        } else {
            const index = this.activeList.findIndex((item) => item === value);
            if (index >= 0) {
                this.activeList.splice(index, 1);
                this.outputDecoration(this.activeList);
            }
        }

        this.propagateChange(this.activeList);
    }

    // Если включили чекбокс 'выбрать всё' - добавляем в массив активных значений все значения кроме чекбокса 'выбрать всё',
    // если выключили - удаляем все значения из масиива
    public checkAll(event) {
        this.btnList.forEach((item) => {
            if (item.value !== 'all') {
                if (event.target.checked && !this.activeList.some((value) => value === item.value)) {
                    this.activeList.push(item.value);
                    this.outputDecoration(this.activeList);
                } else if (!event.target.checked) {
                    const index = this.activeList.findIndex((value) => value === item.value);
                    if (index >= 0) {
                        this.activeList.splice(index, 1);
                        this.outputDecoration(this.activeList);
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

    public outputDecoration(list) {

        let transformList = '';

        if (list.length === this.btnList.length) {
            this.decoration.emit(transformList);
            return;
        }

        list.forEach( (item) => {
            if (item === '00') {
                transformList = 'Без отделки, ' + transformList;
            } else if (item === '01') {
                transformList = 'WhiteBox, ' + transformList;
            } else {
                transformList = 'Чистовая отделка, ' + transformList;
            }
        });
        this.decoration.emit(transformList);
    }
}

