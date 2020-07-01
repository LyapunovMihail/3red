import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { JkObjectsNumberPipe } from '../jk-objects-number.pipe';

@Component({
    selector: 'app-jk-objects-form',
    templateUrl: './objects-form.component.html',
    styleUrls: ['./objects-form.component.scss']
})
export class ObjectsFormComponent implements OnInit {

    public showPopUp = false;

    public formEvents: any;
    public form: FormGroup;
    public priceMin: string;
    public priceMax: string;
    public isFirstBoot = true;

    public navList = [
        { name: 'Все', link: 'Все'},
        { name: 'В проекте', link: 'В проекте'},
        { name: 'В строительстве', link: 'В строительстве'},
        { name: 'Готовые', link: 'Готовые'}
    ];

    @Output()
    public formChange = new EventEmitter();

    @Input()
    public btnList: any[] = [];
    @Input()
    public minPricePlaceholder: any[] = [];
    @Input()
    public maxPricePlaceholder: any[] = [];

    constructor(
        public activatedRoute: ActivatedRoute,
        public formBuilder: FormBuilder,
        private jkObjectsNumberPipe: JkObjectsNumberPipe
    ) {}

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.setForm(queryParams);
        });
    }

    /// format input's values
    public removeChars(e) {
        const rep = /[-.;":'a-zA-Zа-яА-Я]/g;
        if (rep.test(e.target.value)) {
            e.target.value = (e.target.value.replace(rep, ''));
        }
    }

    public setForm(queryParams) {
        this.form = this.formBuilder.group({
            priceMin: this.jkObjectsNumberPipe.transform(queryParams.priceMin || ''),
            priceMax: this.jkObjectsNumberPipe.transform(queryParams.priceMax || ''),
            districts: [queryParams.districts ? queryParams.districts.split(',') : []],
            status: queryParams.status || 'Все'
        });

        let params = this.onFormChange(this.form.value);
        if (params.priceMin === '') {
            delete params.priceMin;
        }
        if (params.priceMax === '') {
            delete params.priceMax;
        }

        this.formChange.emit(params);

        this.formEvents = this.form.valueChanges.subscribe((form) => {
            if (form.priceMin === '') {
                delete params.priceMin;
            }
            if (form.priceMax === '') {
                delete params.priceMax;
            }

            params = this.onFormChange(form);
            this.formChange.emit(params);
        });

        this.isFirstBoot = false;
    }

    public onFormChange(form) {
        const params: any = {};

        params.priceMin = form.priceMin.replace(/[\s]/g, '');
        params.priceMax = form.priceMax.replace(/[\s]/g, '');

        if (form.status !== 'Все') {
            params.status = form.status;
        }
        if (form.districts.length > 0) {
            params.districts = (form.districts).join(',');
        }
        return params;
    }

    public switchPopup(item) {
        item.classList.remove('show');
        item.classList.add('hide');
        setTimeout(() => this.showPopUp = false, 400);
    }
}
