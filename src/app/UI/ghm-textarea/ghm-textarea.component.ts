import { Component, ElementRef, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'ghm-textarea',
    template: `
        <div class="textarea__container">
            <div [innerHTML]="value + '\r\n' | ghmTextAreaPipe"
                class="textarea__fake"
                 [class.white-placeholder]="whitePlaceholder"
                 #fakeTextArea
            >
            </div>
            <textarea [(ngModel)]="value"
                (input)="propagateChange($event.target.value)"
                (focus)="showLink = true"
                spellcheck="false" class="textarea__input"
                [ngClass]="{
                    'invalid-value': invalid,
                    'white-placeholder': whitePlaceholder
                }"
                #area
            >
            </textarea>
            <p class="textarea__placeholder" *ngIf="placeholder.length > 0"
                [class.textarea__placeholder_top]="area.value.length > 0">{{placeholder}}</p>
            <p class="textarea__add-link" *ngIf="link"
                [class.textarea__add-link_show]="showLink" (click)="addLink.emit({textArea: area, fakeTextArea: fakeTextArea})">Вставить ссылку</p>
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

export class GHMTextAreaComponent implements ControlValueAccessor, OnInit {

    @Input() public value = '';

    @Input() public placeholder = '';

    @Input() public whitePlaceholder: boolean;

    @Input() public link: boolean;

    @Input() public invalid: boolean;

    @Input() public bodyBlockIndex: boolean;

    @Output() public addLink: EventEmitter<any> = new EventEmitter();

    // public textAreaValue: string = '';
    public showLink = false;

    constructor(
    ) {}

    ngOnInit() {
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

    public propagateChange(_: any) {}

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public registerOnTouched() {}


}
