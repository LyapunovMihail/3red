import { PlatformDetectService } from './../../platform-detect.service';
import { FormsRequestService } from './../forms-request.service';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare let $: any;

@Component({
    selector: 'app-form-reserve',
    styleUrls: ['./../forms-request.component.scss'],
    templateUrl: './form-reserve.component.html'
})

export class FormReserveComponent implements OnChanges {

    @Input() isOpen: boolean = false;
    @Input() public apartmentNumber: string;
    @Input() public apartmentPrice: number;
    @Input() public type: string;
    @Output() close: EventEmitter<boolean> = new EventEmitter();

    public form: FormGroup = this.formBuilder.group({
        name: '',
        price: '',
        number: '',
        type: '',
        mail: ['', Validators.compose([Validators.required, Validators.email])],
        phone: ['', Validators.compose([Validators.required, Validators.maxLength(18), Validators.minLength(18)])],
        time: '',
        wait_for_call: 'now',
        agreement: true
    });

    public phoneMask = ['+', '7', ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, '-', /\d/, /\d/];
    public timeMask = [/\d/, /\d/, ':', /\d/, /\d/];

    public isSubmited: boolean = false;

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
            this.form.controls['mail'].setValue('');
            this.form.controls['price'].setValue(this.apartmentPrice);
            this.form.controls['number'].setValue(this.apartmentNumber);
            this.form.controls['type'].setValue(this.type);
            this.isSubmited = false;
        }
    }

    public timeFocus() {
        if (this.platform.isBrowser) {
            $('.form-request__field_time').focus();
        }
    }

    public onSubmit(form) {
        this.service.sendReserveForm(form).subscribe(
            (data) => {
                this.isSubmited = true;
            },
            (error) => {
                alert('Что-то пошло не так! Ошибка при отправке формы!');
                console.log(error);
            }
        );
    }
}
