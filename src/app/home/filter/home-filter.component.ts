import {Component, OnDestroy, OnInit, ViewChild, ElementRef, HostListener} from '@angular/core';
import { FormConfig } from '../../flats/search/search-form/search-form.config';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { GHMNumberPipe } from '../../flats/search/search-form/ghm-range-number/ghm-number.pipe';
import { HomeFilterService } from './home-filter.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-item-filter',
    templateUrl: 'home-filter.component.html',
    styleUrls: ['home-filter.component.scss'],
    providers: [
        HomeFilterService,
        GHMNumberPipe
    ],
})

export class HomeFilterComponent implements OnInit, OnDestroy {

    public config = FormConfig;
    public form: FormGroup;
    public formEvents: any;
    public params: { priceMin: string, priceMax: string, rooms?: string, mod: string, status: string };
    public flatsLength: number;
    public modsBtnList;
    public showMods = false;
    public hideMods = false;
    public isExpanded = false;
    public availableFlats: IAddressItemFlat[];
    @ViewChild('myDiv')
    public myDivElementRef: ElementRef;

    constructor(
        public formBuilder: FormBuilder,
        public homeFilterService: HomeFilterService,
        public parseNumberPipe: GHMNumberPipe,
        public router: Router
    ) {
    }

    ngOnInit() {
        this.getConfig({type: 'КВ, АП', status: '4', mod: ''}).subscribe(
            (data) => {
                this.config = data.config;
                this.modsBtnList = data.modsBtnList;
                this.formBuild();
            },
            (err) => console.error(err)
        );
    }

    @HostListener('document:click', ['$event'])
    onClick(event) {
        console.log('this.myDivElementRef: ', this.myDivElementRef);
        if (!this.myDivElementRef.nativeElement.contains(event.target)) {
            this.isExpanded = null;
        }
    }

    public getConfig(params) {
        return this.homeFilterService.getFlatsData(params);
    }

    public parseText(num) {

        num = Math.abs(num) % 100;
        const words = ['предложение', 'предложения', 'предложений'];
        const sum = num % 10;

        if (num > 10 && num < 20) {
            return words[2];
        }
        if (sum > 1 && sum < 5) {
            return words[1];
        }
        if (sum === 1) {
            return words[0];
        }
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
                mod: [[]]
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
            mod: form.mod.join(','),
            status: '4',
        };
        if ('rooms' in form && form.rooms.some((i) => i === true)) {
            this.params.rooms = (form.rooms).map((index, i) => (index) ? i : false).filter((i) => i !== false).join(',');
        }

        this.getFlats();
    }

    public getFlats() {
        if (this.params.mod === '') {
            delete this.params.mod;
        }
        this.homeFilterService.getFlats(this.params).subscribe(
            (data: IAddressItemFlat[]) => {
                this.flatsLength = data.length;
            },
            (err) => {
                console.log(err);
            }
        );
    }

    ngOnDestroy() {
        if (this.formEvents) {
            this.formEvents.unsubscribe();
        }
    }

    // public switchPopup() {
    //     this.hideMods = true;
    //     setTimeout(() => {
    //         this.showMods = false;
    //         this.hideMods = false;
    //     }, 400);
    // }
}
