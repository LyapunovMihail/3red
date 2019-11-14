import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ControlValueAccessor, Validator } from '@angular/forms';

@Component({
    selector: 'ghm-textarea',
    template: `
        <div class="textarea__container">

            <div [innerHTML]="value + '\r\n' | ghmTextAreaPipe"
                class="textarea__fake">
            </div>
            <textarea [(ngModel)]="value"
                (input)="propagateChange($event.target.value)"
                spellcheck="false" class="textarea__input">
            </textarea>

        </div>
    `,
    styleUrls: ['./ghm-textarea.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => GHMTextAreaComponent),
            multi: true
        }
    ]
})

export class GHMTextAreaComponent implements ControlValueAccessor {

    @Input() public value: string = '';

    @Input() public placeholder: string = '';

    // public textAreaValue: string = '';

    constructor() {}

    public writeValue(control) {
        if (typeof control === 'string') {
            this.value = control;
        } else if (!control) {
            this.value = '';
        } else {
            throw new Error(`GHMTextArea recived ${control} value, it should be a string!`);
        }
    }

    public propagateChange (_: any) {}

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}
}
