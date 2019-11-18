import { SHARES_UPLOADS_PATH, ShareBodyBlock } from '../../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-shares-edit-image',
    template: `
        <div class="share-view__blocks-img-wrap">
            <img class="share-view__blocks-img" [src]="uploadsPath + conf.blockImg.image">
            <div class="share-block-remove-btn share-block-remove-btn_for-text" (click)="remove.next()"></div>
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

    changeText() {
        this.propagateChange(this.conf);
    }
}
