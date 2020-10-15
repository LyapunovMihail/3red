import { PlatformDetectService } from './../../platform-detect.service';
import { FormsRequestService } from './../forms-request.service';
import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
declare let $: any;

@Component({
    selector: 'app-form-credit',
    styleUrls: ['./../forms-request.component.scss'],
    templateUrl: './form-credit.component.html'
})

export class FormCreditComponent implements OnChanges {

    @Input() public isOpen: boolean = false;
    @Input() public apartmentNumber: string;
    @Input() public apartmentPrice: number;
    @Input() public articleId: string;
    @Input() public type: string;
    @Input() public jkName: string;
    @Output() public close: EventEmitter<boolean> = new EventEmitter();
    @Output() public isSubmited = new EventEmitter<boolean>();

    public form: FormGroup = this.formBuilder.group({
        first_pay: '',
        period_pay: '',
        // price: '',
        // number: '',
        type: '',
        mail: '',
        name: '',
        lastName: '',
        middleName: '',
        phone: ['', Validators.compose([Validators.required, Validators.pattern(/^[0-9]+(?!.)/), Validators.maxLength(11), Validators.minLength(11)])],
        time: '',
        wait_for_call: 'now',
        agreement: true,
        articleId: '',
        description: ''
    });

    // public phoneMask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    public phoneMask = [/\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/];
    public timeMask = [/\d/, /\d/, ':', /\d/, /\d/];

    constructor(
        public formBuilder: FormBuilder,
        public service: FormsRequestService,
        public platform: PlatformDetectService
    ) { }

    ngOnChanges(changes: SimpleChanges) {
        if ( 'isOpen' in changes && this.isOpen === true ) {
            this.form.reset();
            this.form.controls['wait_for_call'].setValue('now');
            this.form.controls['agreement'].setValue(true);
            this.form.controls['phone'].setValue('');
            this.form.controls['period_pay'].setValue('');
            this.form.controls['first_pay'].setValue('');
            this.form.controls['mail'].setValue('');
            // this.form.controls['price'].setValue(this.apartmentPrice);
            // this.form.controls['number'].setValue(this.apartmentNumber);
            this.form.controls['type'].setValue(this.type);
            this.form.controls['articleId'].setValue(this.articleId);
            this.form.controls['description'].setValue('');
        }
    }

    public timeFocus() {
        if (this.platform.isBrowser) {
            $('.form_item_field--time').focus();
        }
    }

    public onSubmit(form) {
        this.service.sendCreditForm(form).subscribe(
            (data) => {
                this.close.emit(false);
                this.isSubmited.emit(true);
            },
            (error) => {
                alert('Что-то пошло не так! Ошибка при отправке формы!');
                console.log(error);
            }
        );
    }
}
