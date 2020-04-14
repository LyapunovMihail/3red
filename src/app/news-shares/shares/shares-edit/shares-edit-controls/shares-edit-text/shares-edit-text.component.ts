import { Component, forwardRef, Output, EventEmitter, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ShareBodyBlock } from '../../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';

@Component({
    selector: 'app-shares-edit-text',
    template: `
        <div class="create-shares__wrap create-shares__wrap_path">
            <h3 class="create-shares__typografy-title create-shares__typografy-title_in-path">{{type === 'title' ? 'Заголовок' : 'Абзац'}}</h3>

            <div class="create-shares__wrap create-shares__wrap_btn">
                <button class="create-shares__btn create-shares__btn_path-controll" (click)="remove.next()">Удалить</button>
                <a class="create-shares__btn create-shares__btn_path-controll" *ngIf="isFirst > 0" (click)="move.emit(-1)">Вверх</a>
                <a class="create-shares__btn create-shares__btn_path-controll" *ngIf="!isLast" (click)="move.emit(1)">Вниз</a>
            </div>

            <div class="create-shares__wrap create-shares__wrap_input create-shares__wrap_full">
                <ghm-textarea *ngIf="conf && type === 'description'" [(ngModel)]="conf.blockDescription"
                    (input)="changeText()"
                    [placeholder]="type === 'title' ? 'Заголовок' : 'Текст'"
                    [link]="type === 'description'"
                    [bodyBlockIndex]="conf.blockOrderNumber"
                    (addLink)="addLink.emit($event)"
                    class="create-shares__input create-shares__input_area">
                </ghm-textarea>
                <ghm-textarea *ngIf="conf && type === 'title'" [(ngModel)]="conf.blockTitle"
                    (input)="changeText()"
                    [placeholder]="type === 'title' ? 'Заголовок' : 'Текст'"
                    [link]="type === 'description'"
                    [bodyBlockIndex]="conf.blockOrderNumber"
                    (addLink)="addLink.emit($event)"
                    class="create-shares__input create-shares__input_area">
                </ghm-textarea>
            </div>
        </div>
    `,
    styleUrls: [
        './../../shares-edit.component.scss',
        './shares-edit-text.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SharesEditTextComponent),
            multi: true
        }
    ]
})
export class SharesEditTextComponent implements ControlValueAccessor {

    @Output() public remove: EventEmitter<any> = new EventEmitter();
    @Output() public addLink: EventEmitter<any> = new EventEmitter();
    @Input() public type: string;
    @Output() public move: EventEmitter<any> = new EventEmitter();
    @Input() public isLast;
    @Input() public isFirst;

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
