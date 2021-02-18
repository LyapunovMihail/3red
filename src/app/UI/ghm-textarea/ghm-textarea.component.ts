import { AfterViewInit, Component, ElementRef, EventEmitter, forwardRef, Input, Output, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
    selector: 'ghm-textarea',
    template: `
        <div class="textarea__container">
            <!--<div [innerHTML]="value + '\r\n' | ghmTextAreaPipe"-->
            <div
                    class="textarea__fake"
                    [class.white-placeholder]="whitePlaceholder"
                    #fakeTextArea
            >
            </div>
            <textarea [(ngModel)]="value"
                      (input)="input($event.target.value)"
                      (focus)="showLink = true"
                      spellcheck="false" class="textarea__input"
                      [ngClass]="{
                    'invalid-value': invalid,
                    'white-placeholder': whitePlaceholder
                }"
                      rows="1"
                      appAutoResizeTextarea
                      #area
            >
            </textarea>
            <p class="textarea__placeholder" *ngIf="placeholder.length > 0"
               [class.textarea__placeholder_top]="area.value.length > 0">{{placeholder}}</p>
            <p class="textarea__add-link" *ngIf="link"
               [class.textarea__add-link_show]="showLink" (click)="addLink.emit({textArea: area})">Вставить ссылку</p>
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

export class GHMTextAreaComponent implements ControlValueAccessor, AfterViewInit {

    @Input() public value = '';

    @Input() public placeholder = '';

    @Input() public whitePlaceholder: boolean;

    @Input() public link: boolean;

    @Input() public invalid: boolean;

    @Input() public bodyBlockIndex: boolean;

    @Output() public addLink: EventEmitter<any> = new EventEmitter();

    @ViewChild('fakeTextArea') public fakeTextArea: ElementRef;
    @ViewChild('area') public area: ElementRef;

    public showLink = false;

    constructor() {
    }

    ngAfterViewInit() {
        setTimeout(() => {
            this.fakeTextArea.nativeElement.style.height = this.area.nativeElement.style.height;
        });
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

    public propagateChange(_: any) {
    }

    public registerOnChange(fn) {
        this.propagateChange = fn;
    }

    public input(val) {
        this.fakeTextArea.nativeElement.style.height = this.area.nativeElement.style.height;
        this.propagateChange(val);
    }

    public registerOnTouched() {
    }


}
