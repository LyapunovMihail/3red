import { SHARES_UPLOADS_PATH, ShareBodyBlock } from '../../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Output, EventEmitter, Input } from '@angular/core';

@Component({
    selector: 'app-shares-edit-image',
    template: `
        <div class="share-view__btn-wrap">
            <ng-content></ng-content>
        </div>
        <div class="create-shares__wrap create-shares__wrap_path">
            <h3 class="create-shares__typografy-title create-shares__typografy-title_in-path">Изображение</h3>

            <div class="create-shares__wrap create-shares__wrap_btn">
                <button class="create-shares__btn create-shares__btn_path-controll" (click)="remove.next()">Удалить</button>
                <a class="create-shares__btn create-shares__btn_path-controll" *ngIf="isFirst > 0" (click)="move.emit(-1)">Вверх</a>
                <a class="create-shares__btn create-shares__btn_path-controll" *ngIf="!isLast" (click)="move.emit(1)">Вниз</a>
            </div>
            <img class="share-view__blocks-img" [src]="uploadsPath + conf.blockImg.image">
        </div>
    `,
    styleUrls: [
        './shares-edit-image.component.scss',
        './../../shares-edit.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SharesEditImageComponent),
            multi: true
        }
    ]
})
export class SharesEditImageComponent implements ControlValueAccessor {

    @Output() public remove: EventEmitter<any> = new EventEmitter();
    @Output() public move: EventEmitter<any> = new EventEmitter();
    @Input() public isLast;
    @Input() public isFirst;

    // путь для загрузки изображений
    uploadsPath: string = `/${SHARES_UPLOADS_PATH}`;

    public conf: ShareBodyBlock;

    constructor() {}

    writeValue(value: any) {
        this.conf = value;
    }

    propagateChange = (_: any) => {};

    registerOnChange(fn) {
      this.propagateChange = fn;
    }

    registerOnTouched() {}
}
