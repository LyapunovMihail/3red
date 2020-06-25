import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
    selector: 'app-filter-mod-list',
    templateUrl: './mod-list.component.html',
    styleUrls: ['./mod-list.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => ModListComponent),
            multi: true
        }
    ],
    animations: [
        trigger('expandedPanel', [
            transition('void => *', [
                style({ opacity: 0 }),
                animate('.2s', style({ opacity: 1 }))
              ]),
              transition('* => void', [animate('.2s', style({ opacity: 0 }))])
        ])
      ]
})

export class ModListComponent {

    @Input() public btnList: any[] = [];
    @Input() public isExpanded: boolean = false;

    public activeList: string[] = [];

    constructor() {}

    public isChecked(val) {
        if (val === '') {
            return this.isCheckedAll();
        }
        return this.activeList.some((item) => item === val);
    }

    // Если проверяется состояние чекбокса 'выбрать всё' - проверяем равен ли массив значений кол-ву чекбоксов-1, если равен, то возвращаем тру, если нет - фэлс.
    // Так как значение 'выбрать всё' не попадает в массив значений, сделать проверку на наличие этого значения в массиве не удастся
    public isCheckedAll(): boolean {
        return this.activeList.length === this.btnList.length - 1;
    }

    public checkBtn(event) {
        const value = event.target.value;
        if (value === '') {
            this.checkAll(event);
            this.propagateChange(this.activeList);
            return;
        }

        if (event.target.checked && !this.activeList.some((item) => item === value)) {
            this.activeList.push(value);
        } else {
            const index = this.activeList.findIndex((item) => item === value);
            if (index >= 0) {
                this.activeList.splice(index, 1);
            }
        }

        this.propagateChange(this.activeList);
    }

    // Если включили чекбокс 'выбрать всё' - добавляем в массив активных значений все значения кроме чекбокса 'выбрать всё', если выключили - удаляем все значения из масиива
    public checkAll(event) {
        this.btnList.forEach((item) => {
           if (item.value !== '') {
               if (event.target.checked && !this.activeList.some((value) => value === item.value)) {
                   this.activeList.push(item.value);
               } else if (!event.target.checked) {
                   const index = this.activeList.findIndex((value) => value === item.value);
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

