import { AuthorizationObserverService } from './../../authorization/authorization.observer.service';
import { IDynamicObject } from '../../../../serv-files/serv-modules/dynamic-api/dynamic.interfaces';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-dynamic-date',
    templateUrl: './dynamic-date.component.html',
    styleUrls: ['./dynamic-date.component.scss']
})

export class DynamicDateComponent implements OnInit, OnChanges, OnDestroy {

    @Input() month: number;
    @Input() year: number;
    @Input() objectsArray: IDynamicObject[] = [];

    @Output() monthChange: EventEmitter<number> = new EventEmitter();
    @Output() yearChange: EventEmitter<number> = new EventEmitter();

    public date = new Date();

    public realYear: number = Number(this.date.getFullYear());
    public realMonth: number = Number(this.date.getMonth()) + 1;

    public monthArray: any[] = [
        {
            name: 'Январь',
            value: 1,
            disabled: false
        }, {
            name: 'Февраль',
            value: 2,
            disabled: false
        }, {
            name: 'Март',
            value: 3,
            disabled: false
        }, {
            name: 'Апрель',
            value: 4,
            disabled: false
        }, {
            name: 'Май',
            value: 5,
            disabled: false
        }, {
            name: 'Июнь',
            value: 6,
            disabled: false
        }, {
            name: 'Июль',
            value: 7,
            disabled: false
        }, {
            name: 'Август',
            value: 8,
            disabled: false
        }, {
            name: 'Сентябрь',
            value: 9,
            disabled: false
        }, {
            name: 'Октябрь',
            value: 10,
            disabled: false
        }, {
            name: 'Ноябрь',
            value: 11,
            disabled: false
        }, {
            name: 'Декабрь',
            value: 12,
            disabled: false
        }
    ];

    public AuthorizationEvent;
    public isAuthorizated: boolean = false;

    public yearsArray: number[] = [];

    constructor(
        private authorization: AuthorizationObserverService,
        public ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        // подписка на авторизацию
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
            this.monthParser(this.year);
            this.ref.detectChanges();
        });
        this.yearsArray = this.yearsArrayGenerate();
    }

    ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ( 'objectsArray' in changes ) {
            this.monthParser(this.year);
            this.ref.detectChanges();
        }
    }

    monthParser(year) {
        const activeYear = year;
        this.monthArray.forEach((item) => {
            item.disabled =
                // если пользователь авторизован, то все месяца будут активны
                (this.isAuthorizated) ? false : (
                    // иначе
                    // если из массива объектов ни один не равен значению месяца и выбранного года
                    !this.objectsArray.some((obj) => {
                        return (obj.year === activeYear && obj.month === item.value);
                    }) // ||
                    // или значение месяца больше месяца реальной даты
                    // (item.value > this.realMonth && activeYear === this.realYear)
                );
        });
    }

    private yearsArrayGenerate(): number[] {
        let from = 2019;
        let to = Number(this.date.getFullYear());
        let result = [];
        for ( let i = from ; i <= to ; i ++ ) {
            result.push(i);
        }
        return result;
    }

}
