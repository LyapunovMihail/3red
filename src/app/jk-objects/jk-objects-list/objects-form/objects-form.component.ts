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

    @Output()
    public formChange = new EventEmitter();

    @Input()
    public btnList: any[] = [];

    constructor(
        public activatedRoute: ActivatedRoute,
        public formBuilder: FormBuilder,
        private jkObjectsNumberPipe: JkObjectsNumberPipe
    ) {
    }

    ngOnInit() {
        this.activatedRoute.queryParams.subscribe((queryParams) => {
            this.setForm(queryParams);
        });
    }

    /// format input's values
    public removeChars(val, field) {
        const rep = /[-.;":'a-zA-Zа-яА-Я]/g;
        if (rep.test(val)) {
            this.form.get(field).setValue(val.replace(rep, ''));
        }
    }

    public setForm(queryParams) {
        this.form = this.formBuilder.group({
            priceMin: this.jkObjectsNumberPipe.transform(queryParams.priceMin || '1000000'),
            priceMax: this.jkObjectsNumberPipe.transform(queryParams.priceMax || '10000000'),
            districts: [queryParams.districts ? queryParams.districts.split(',') : []],
            status: queryParams.status || 'Все'
        });
        this.formEvents = this.form.valueChanges.subscribe((form) => {
            const params = this.onFormChange(form);
            this.formChange.emit(params);
        });
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
        console.log('params: ', params);
        return params;
    }


}
