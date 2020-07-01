import { Component, EventEmitter, Output, OnChanges, Input } from '@angular/core';
import { MONTHARRAY } from '../monthArray';
import { IDynamicObject } from '../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { DynamicService } from '../dynamic-admin-content.service';

@Component({
    selector: 'app-object-dynamic-month-switcher',
    templateUrl: 'object-dynamic-month-switcher.component.html',
    styleUrls: ['object-dynamic-month-switcher.component.scss']
})

export class ObjectDynamicMonthSwitcherComponent implements OnChanges {


    @Input() month = 0;
    @Input() year = 0;
    @Input() objectsArray: IDynamicObject[] = [];
    @Input() objectId: string;

    @Output() monthChange: EventEmitter<number> = new EventEmitter();
    @Output() yearChange: EventEmitter<number> = new EventEmitter();

    public prevBtn: string;
    public nextBtn: string;
    public isValidPrevMonth: boolean;
    public isValidNextMonth: boolean;

    public date = new Date();

    public realYear = Number(this.date.getFullYear());
    public realMonth = Number(this.date.getMonth()) + 1;

    public monthArray: string[] = MONTHARRAY;

    constructor(
        public dynamicService: DynamicService
    ) { }

    public ngOnChanges() {
        this.prevBtn = (this.month === 1) ? this.monthArray[11] : this.monthArray[this.month - 2];
        this.nextBtn = (this.month === 12) ? this.monthArray[0] : this.monthArray[this.month];

        this.checkPrevMonth();
        this.checkNextMonth();
    }

    public checkPrevMonth() {
        const prevMonth = this.month === 1 ? 12 : this.month - 1;
        const year = this.month === 1 ? this.year - 1 : this.year;
        // Проверяем совпадает ли хоть один объект из массива значению месяца и выбранного года
        // this.isValidPrevMonth = this.objectsArray.some((obj) => {
        //     return (obj.year === year && obj.month === prevMonth);
        // });
        this.getSnippet('prev', year, prevMonth);
    }

    public checkNextMonth() {
        const nextMonth = this.month === 12 ? 1 : this.month + 1;
        const year = this.month === 12 ? this.year + 1 : this.year;
        // Проверяем совпадает ли хоть один объект из массива значению месяца и выбранного года
        // this.isValidNextMonth = this.objectsArray.some((obj) => {
        //     return (obj.year === year && obj.month === nextMonth);
        // });
        this.getSnippet('next', year, nextMonth);
    }

    public toPrevMonth() {
        const month = this.month;
        if (month === 1) {
            this.yearChange.emit(this.year - 1);
        }
        setTimeout(() => {
            this.monthChange.emit(((month === 1) ? 12 : month - 1));
        }, 20);
    }

    public toNextMonth() {
        const month = this.month;
        if (month === 12) {
            this.yearChange.emit(this.year + 1);
        }
        setTimeout(() => {
            this.monthChange.emit(((month === 12) ? 1 : month + 1));
        }, 20);
    }

    public getSnippet(check, year, month) {
        this.dynamicService.getContentSnippet(this.objectId, year, month).subscribe(
            (data) => {
                if (check === 'prev') {
                    this.isValidPrevMonth = !!data && !!data.objects.length;
                } else if (check === 'next') {
                    this.isValidNextMonth = !!data && !!data.objects.length;
                }
            },
            (err) => console.error(err)
        );
    }

}
