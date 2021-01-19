import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormConfig } from '../../../flats/search/search-form/search-form.config';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { HouseService } from '../object-flat/house/house.service';
import { IAddressItemFlat } from '../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { GHMNumberPipe } from '../../../flats/search/search-form/ghm-range-number/ghm-number.pipe';

@Component({
    selector: 'app-object-item-filter',
    templateUrl: 'object-filter.component.html',
    styleUrls: ['object-filter.component.scss'],
    providers: [
        HouseService,
        GHMNumberPipe
    ]
})

export class ObjectFilterComponent implements OnInit, OnDestroy {

    @Input()
    public objectId: string;
    @Input()
    public mod: string;

    public config = FormConfig;
    public form: FormGroup;
    public formEvents: any;
    public params: { priceMin: string, priceMax: string, rooms?: string, mod: string, status: string };
    public flatsLength: number;

    constructor(
        public formBuilder: FormBuilder,
        public service: HouseService,
        public parseNumberPipe: GHMNumberPipe
    ) { }

    ngOnInit() {
        this.getConfig().subscribe(
            (data) => {
                this.config = data.config;
                this.formBuild();
            },
            (err) => console.error(err)
        );
    }

    public getConfig() {
        return this.service.getConfig({mod: this.mod, type: 'КВ,АП', status: '4'});
    }

    public parseText(num) {

        num = Math.abs(num) % 100;
        const words = ['предложение', 'предложения', 'предложений'];
        const sum = num % 10;

        if (num > 10 && num < 20) { return words[2]; }
        if (sum > 1 && sum < 5) { return words[1]; }
        if (sum === 1) { return words[0]; }
        return words[2];
    }

    public formBuild() {
        const roomArr = [false, false, false, false];

        this.form = this.formBuilder.group(
            {
                price: {
                    min: this.config.price.min,
                    max: this.config.price.max
                },
                rooms: this.formBuilder.array(roomArr.map((room) => new FormControl(room))),
                mod: this.mod
            }
        );

        this.onFormChange(this.form.value);
        this.formEvents = this.form.valueChanges.subscribe((form) => {
            this.onFormChange(form);
        });
    }

    public onFormChange(form) {
        this.params = {
            priceMin: form.price.min,
            priceMax: form.price.max,
            mod: form.mod,
            status: '4'
        };
        if ( 'rooms' in form && form.rooms.some((i) => i === true) ) {
            this.params.rooms = (form.rooms).map((index, i) => (index) ? i : false).filter((i) => i !== false).join(',');
        }

        this.getFlats();
    }

    public getFlats() {
        this.service.getFlats(this.params).subscribe(
            (data: IAddressItemFlat[]) => {
                this.flatsLength = data.length;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    ngOnDestroy() {
        this.formEvents.unsubscribe();
    }

}
