import { ShareBodyBlock } from '../../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-shares-edit-list',
    template: `
        <div>
            <ul #list class="share-view__blocks-list">
                <li class="share-view__blocks-list-item" *ngFor="let item of conf.blockList; index as i; trackBy:trackByFn">
                    <ghm-textarea class="shares-edit-form__field share-view__blocks-list__field" [(ngModel)]="conf.blockList[i]"
                        (input)="changeText(i)"
                        [placeholder]="'Текст'"></ghm-textarea>
                    <div class="share-block-remove-btn share-block-remove-btn_for-text" (click)="removeItem(i)"></div>
                </li>
            </ul>
            <div class="share-view__blocks-list-add-btn" (click)="conf.blockList.push('')">Добавить еще пункт</div>
        </div>
    `,
    styleUrls: [
        './shares-edit-list.component.scss',
        './../../shares-edit.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => SharesEditListComponent),
            multi: true
        }
    ]
})
export class SharesEditListComponent implements ControlValueAccessor {

    @Output() public remove: EventEmitter<any> = new EventEmitter();

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

    public removeItem(i) {
        if (this.conf.blockList.length > 1) {
            if (confirm('Удалить пункт списка?')) {
                this.conf.blockList.splice(i, 1);
            }
        } else {
            this.remove.next();
        }
    }

    trackByFn(index: any, item: any) {
        return index;
    }
}
