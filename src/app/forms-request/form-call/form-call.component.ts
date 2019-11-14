import { PlatformDetectService } from './../../platform-detect.service';
import { FormsRequestService } from './../forms-request.service';
import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare let $: any;

@Component({
    selector: 'app-form-call',
    styleUrls: ['./../forms-request.component.scss'],
    templateUrl: './form-call.component.html'
})

export class FormCallComponent implements OnChanges {

    @Input() isOpen: boolean = false;
    @Output() close: EventEmitter<boolean> = new EventEmitter();

    public form: FormGroup = this.formBuilder.group({
        name: '',
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
            this.isSubmited = false;
        }
    }

    public timeFocus() {
        if (this.platform.isBrowser) {
            $('.form-request_field--time').focus();
        }
    }

    public onSubmit(form) {
        this.service.sendCallForm(form).subscribe(
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
