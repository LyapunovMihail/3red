import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Output, EventEmitter, Input } from '@angular/core';
import { NEWS_UPLOADS_PATH, NewsBodyBlock } from '../../../../../../../serv-files/serv-modules/news-api/news.interfaces';

@Component({
    selector: 'app-news-edit-image',
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
        './news-edit-image.component.scss',
        './../../news-form.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NewsEditImageComponent),
            multi: true
        }
    ]
})
export class NewsEditImageComponent implements ControlValueAccessor {

    @Output() public remove: EventEmitter<any> = new EventEmitter();
    @Output() public move: EventEmitter<any> = new EventEmitter();
    @Input() public isLast;
    @Input() public isFirst;

    // путь для загрузки изображений
    uploadsPath: string = `/${NEWS_UPLOADS_PATH}`;

    public conf: NewsBodyBlock;

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
