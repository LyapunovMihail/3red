import {Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'ghm-textarea',
    template: `
        <div class="textarea__container">

            <div [innerHTML]="value + '\r\n' | ghmTextAreaPipe"
                class="textarea__fake"
                 [class.white-placeholder]="whitePlaceholder"
            >
            </div>
            <textarea [(ngModel)]="value"
                (input)="propagateChange($event.target.value)"
                spellcheck="false" class="textarea__input"
                placeholder="{{placeholder}}"
                [class.white-placeholder]="whitePlaceholder"
            >
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

    @Input() public whitePlaceholder: boolean;

    // public textAreaValue: string = '';

    constructor() {
    }

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
