import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { NEWS_UPLOADS_PATH, NewsBodyBlock } from '../../../../../../../serv-files/serv-modules/news-api/news.interfaces';

@Component({
    selector: 'app-news-edit-image2',
    template: `
        <div class="share-view__btn-wrap">
            <ng-content></ng-content>
        </div>
        <div class="create-shares__wrap create-shares__wrap_path">
            <h3 class="create-shares__typografy-title create-shares__typografy-title_in-path">2 Изображения</h3>

            <div class="create-shares__wrap create-shares__wrap_btn">
                <button class="create-shares__btn create-shares__btn_path-controll" (click)="remove.next()">Удалить</button>
                <button class="create-shares__btn create-shares__btn_path-controll">Вверх</button>
                <button class="create-shares__btn create-shares__btn_path-controll">Вниз</button>
            </div>
            <div class="create-shares__wrap_path-img2">
                <img class="share-view__blocks-img" width="352" height="264" [src]="'/uploads/news/thumbnail-date2020-03-05-11-07-07-37_random1063.jpg'">
                <img class="share-view__blocks-img" width="352" height="264" [src]="'/uploads/news/thumbnail-date2020-03-05-11-07-07-37_random1063.jpg'">
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
