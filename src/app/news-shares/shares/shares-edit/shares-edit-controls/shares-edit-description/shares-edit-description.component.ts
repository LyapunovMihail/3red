import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ShareBodyBlock } from '../../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';

@Component({
    selector: 'app-shares-edit-description',
    template: `
        <div class="create-shares__wrap create-shares__wrap_path">
            <h3 class="create-shares__typografy-title create-shares__typografy-title_in-path">Абзац</h3>

            <div class="create-shares__wrap create-shares__wrap_btn">
                <button class="create-shares__btn create-shares__btn_path-controll" (click)="remove.next()">Удалить</button>
                <button class="create-shares__btn create-shares__btn_path-controll">Вверх</button>
                <button class="create-shares__btn create-shares__btn_path-controll">Вниз</button>
            </div>

            <div class="create-shares__wrap create-shares__wrap_input create-shares__wrap_full">
                <ghm-textarea *ngIf="conf" [(ngModel)]="conf.blockDescription"
                    (input)="changeText()"
                    [placeholder]="'Текст'"
                    [link]="true"
                    class="create-shares__input create-shares__input_area">
                </ghm-textarea>
            </div>
        </div>
    `,
    styleUrls: [
        './shares-edit-description.component.scss',
        './../../shares-edit.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SharesEditDescriptionComponent),
            multi: true
        }
    ]
})
export class SharesEditDescriptionComponent implements ControlValueAccessor {

    @Output() public remove: EventEmitter<any> = new EventEmitter();

    public conf: ShareBodyBlock;

    constructor() {}

    public writeValue(value: any) {
        this.conf = value;
    }

    public propagateChange = (_: any) => {};

    public registerOnChange(fn) {
      this.propagateChange = fn;
    }

    public registerOnTouched() {}

    public changeText() {
        this.propagateChange(this.conf);
    }
}
