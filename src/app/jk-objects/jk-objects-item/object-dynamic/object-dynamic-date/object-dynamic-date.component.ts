import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { AuthorizationObserverService } from './../../../../authorization/authorization.observer.service';
import { IObjectDynamicSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { DynamicService } from '../object-dynamic-admin/dynamic-admin-content/dynamic-admin-content.service';

@Component({
    selector: 'app-object-dynamic-date',
    templateUrl: 'object-dynamic-date.component.html',
    styleUrls: [ 'object-dynamic-date.component.scss' ]
})

export class ObjectDynamicDateComponent implements OnInit, OnChanges, OnDestroy {

    @Input() month: number;
    @Input() year: number;
    @Input() objectId: number;
    @Input() description: number;

    @Output() monthChange: EventEmitter<number> = new EventEmitter();
    @Output() yearChange: EventEmitter<number> = new EventEmitter();

    public date = new Date();
    public tooltipYear = false;

    public snippets: IObjectDynamicSnippet[] = [];

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
        public ref: ChangeDetectorRef,
        public dynamicService: DynamicService
    ) {}

    ngOnInit() {
        // подписка на авторизацию
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
            this.getSnippets();
        });
        this.yearsArray = this.yearsArrayGenerate();
    }

    getSnippets() {
        this.dynamicService.getContentSnippets(this.objectId).subscribe(
            (data) => {
                this.snippets = data;
                this.monthParser(this.year);
                this.ref.detectChanges();
            },
            (err) => console.error(err)
        );
    }

    ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    ngOnChanges(changes: SimpleChanges) {
        this.getSnippets();

        setTimeout(() => {
            if ('year' in changes) {
                this.afterChangeYear();
            }
        }, 100);
    }

    monthParser(year) {
        const activeYear = year;
        this.monthArray.forEach((item) => {
            item.disabled =
                // если пользователь авторизован, то все месяца будут активны
                (this.isAuthorizated) ? false : (
                    // иначе
                    // если из массива объектов ни один не равен значению месяца и выбранного года
                    !this.snippets.some((obj) => {
                        return (obj.year === activeYear && obj.month === item.value);
                    }) // ||
                    // или значение месяца больше месяца реальной даты
                    // (item.value > this.realMonth && activeYear === this.realYear)
                );
        });

    }

    public afterChangeYear() {
        let month = 1;
        if (this.monthArray.find((item) => item.value === this.month).disabled) {
            this.monthArray.forEach((item, i) => {
                if (!item.disabled) {
                    month = item.value;
                }
                if (i === this.monthArray.length - 1) {
                    this.monthChange.emit(month);
                }
            });
        }
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
