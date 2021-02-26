import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter, OnDestroy, Input } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { GHMNumberPipe } from './ghm-range-number/ghm-number.pipe';
import { FormConfig } from './search-form.config';

@Component({
    selector: 'app-search-form',
    templateUrl: './search-form.component.html',
    styleUrls: ['./../search.component.scss'],
    providers: [ GHMNumberPipe ]
})

export class SearchFormComponent implements OnInit, OnDestroy {

    public routerEvents: any;
    public formEvents: any;
    public form: FormGroup;
    public moreFilter = false;
    public showCorpus = false;
    public hideCorpus = false;
    public sort: string;
    public decorList = FormConfig.decorationList;
    public statusList = FormConfig.statusList;
    public euroList = FormConfig.euroList;

    @Input()
    public config: any = {};
    @Input()
    public housesBtnList: any[] = [];
    @Input()
    public modsBtnList: any[] = [];

    @Output() public formChange: EventEmitter<any> = new EventEmitter();
    @Output() public sortChange: EventEmitter<any> = new EventEmitter();

    constructor(
        public formBuilder: FormBuilder,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public parseNumberPipe: GHMNumberPipe
    ) {}

    public ngOnInit() {
        this.routerEvents = this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.buildForm(queryParams);
        });
        setTimeout( () => {
        }, 1000);
    }

    public buildForm(params) {

        const roomsFormArray = ((() => {
            /**
             * if there are rooms in the url's params,
             * then split them into an array,
             * if index is exist, then true
             * otherwise pass an array of false
             */
            const arr = [false, false, false, false];
            if (params.rooms) {
                const result = parseQueryParams(params.rooms);
                const test = result.every((item) => (/^[0|1|2|3]$/).exec((item).toString()) ? true : false);
                if (test) {
                    result.forEach((item) => arr[Number(item)] = true);
                }
            }
            return arr.map((item) => (new FormControl(item)));
        })());
        console.log('params: ', params);
        this.form = this.formBuilder.group({
            space: {
                min: Number(params.spaceMin) || this.config.space.min,
                max: Number(params.spaceMax) || this.config.space.max
            },
            floor: {
                min: Number(params.floorMin) || this.config.floor.min,
                max: Number(params.floorMax) || this.config.floor.max
            },
            price: {
                min: Number(params.priceMin) || this.config.price.min,
                max: Number(params.priceMax) || this.config.price.max
            },
            type: [((type) => {
                if (type && type.split(',').every((item) => ['КВ', 'АП'].some((i) => item === i))) {
                    return type.split(',');
                }
                return [];
            })(params.type)],
            decoration: [((decoration) => {
                if (decoration && decoration.split(',').every((item) => this.decorList.some((i) => item === i.value))) {
                    return decoration.split(',');
                }
                return [];
            })(params.decoration)],
            status: [((status) => {
                if (status && status.split(',').every((item) => this.statusList.some((i) => item === i.value))) {
                    return status.split(',');
                }
                return [];
            })(params.status)],
            rooms: this.formBuilder.array(roomsFormArray) as FormArray,
            sections: [
                ((sections) => {
                    if (sections) {
                        return sections.split(','); // для квартир объектов надо отдавать sections ( один дом ), или пустую строку '';
                    }
                    return [];
                })(params.sections)
            ],
            housesMods: [
                ((housesMods) => {
                    if (housesMods) {
                        return housesMods.split('nzt;').map((item) => JSON.parse(item));
                    }
                    return [];
                })(params.housesMods)               // houses - застрингифаенные объекты, разделённые символами 'nzt;', поэтому сплитим по 'nzt;' и парсим массив с JSON
            ],
            mod: params.mod || '', // mod используется только для составления массива домов housesBtnList, а в него уже записываются моды
            isEuro: [
                ((isEuro) => {
                    if (isEuro && isEuro.split(',').every((item) => this.euroList.some((i) => item === i.value))) {
                        return isEuro.split(',');
                    }
                    return [];
                })(params.isEuro)               // houses - застрингифаенные объекты, разделённые символами 'nzt;', поэтому сплитим по 'nzt;' и парсим массив с JSON
            ],
        });

        this.formChange.emit(this.form.value);

        this.formEvents = this.form.valueChanges.subscribe((form) => {
            console.log('form: ', form);
            this.formChange.emit(form);
        });

        function parseQueryParams(val: string): string[] {
            return val.replace(/[^,0-9]/gim, '')
                .split(',');
        }
    }

    public formReset() {
        this.buildForm({});
        setTimeout(() => {
            this.sort = this.config.sort;
            this.sortChange.emit(this.sort);
        }, 100);
    }

    public ngOnDestroy() {
        if (this.formEvents && this.routerEvents) {
            this.formEvents.unsubscribe();
            this.routerEvents.unsubscribe();
        }
    }

    public switchPopup() {
        this.hideCorpus = true;
        setTimeout(() => {
            this.showCorpus = false;
            this.hideCorpus = false;
        }, 400);
    }
}
