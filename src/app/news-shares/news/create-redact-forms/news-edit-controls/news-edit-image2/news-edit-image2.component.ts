import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Output, EventEmitter, Input } from '@angular/core';
import { NEWS_UPLOADS_PATH, NewsBodyBlock } from '../../../../../../../serv-files/serv-modules/news-api/news.interfaces';

@Component({
    selector: 'app-news-edit-image2',
    template: `
        <div class="share-view__btn2-wrap">
            <ng-content></ng-content>
        </div>
        <div class="create-shares__wrap create-shares__wrap_path">
            <h3 class="create-shares__typografy-title create-shares__typografy-title_in-path">2 Изображения</h3>

            <div class="create-shares__wrap create-shares__wrap_btn">
                <button class="create-shares__btn create-shares__btn_path-controll" (click)="remove.next()">Удалить</button>
                <a class="create-shares__btn create-shares__btn_path-controll" *ngIf="isFirst > 0" (click)="move.emit(-1)">Вверх</a>
                <a class="create-shares__btn create-shares__btn_path-controll" *ngIf="!isLast" (click)="move.emit(1)">Вниз</a>
            </div>
            <div class="create-shares__wrap_path-img2">
                <img class="share-view__blocks-img" width="352" height="264" [src]="uploadsPath + conf.blockImg2.thumbnail" *ngIf="conf.blockImg2.thumbnail">
                <img class="share-view__blocks-img" width="352" height="264" src="/assets/img/news/default.svg" *ngIf="!conf.blockImg2.thumbnail">
                <img class="share-view__blocks-img" width="352" height="264" [src]="uploadsPath + conf.blockImg2.thumbnail2" *ngIf="conf.blockImg2.thumbnail2">
                <img class="share-view__blocks-img" width="352" height="264" src="/assets/img/news/default.svg" *ngIf="!conf.blockImg2.thumbnail2">
            </div>
        </div>
    `,
    styleUrls: [
        './news-edit-image2.component.scss',
        './../../news-form.component.scss'
    ],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NewsEditImage2Component),
            multi: true
        }
    ]
})
export class NewsEditImage2Component implements ControlValueAccessor {

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
