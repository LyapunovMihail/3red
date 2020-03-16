import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-news-edit-anchor',
    template: `
        <section class="g-modal-bg g-modal-bg_for-link paste-link">
            <div class="paste-link__container">

                <button class="paste-link__btn paste-link__btn-close btn-cls" (click)="close.emit()"><span></span></button>

                <div class="paste-link__wrap">
                    <p class="paste-link__subtitle">URL</p>
                    <input type="text" class="paste-link__input" [(ngModel)]="link">
                </div>
                <div class="paste-link__wrap">
                    <p class="paste-link__subtitle">Текст</p>
                    <input type="text" class="paste-link__input" [(ngModel)]="text">
                </div>
                <div class="paste-link__wrap paste-link__wrap_for-checkbox">
                    <label class="g-checkbox">
                        <input type="checkbox" [(ngModel)]="isTargetBlank">
                        <div></div>
                        <span>Открыть ссылку в новом табе</span>
                    </label>
                </div>
                <div class="paste-link__wrap paste-link__wrap_for-btn">
                    <button class="paste-link__btn paste-link__btn-success btn_var-2" (click)="insertText(); close.emit()">Вставить ссылку</button>
                    <button class="paste-link__btn paste-link__btn-cancel btn_var-2" (click)="close.emit()">Отменить</button>
                </div>
            </div>
        </section>
    `,
    styleUrls: [
        './news-edit-anchor.component.scss',
        './../../news-form.component.scss'
    ],
})
export class NewsEditAnchorComponent implements OnInit {

    @Input() public data;
    public textArea;
    public fakeTextArea;
    public formControl;

    @Output() public close: EventEmitter<any> = new EventEmitter();

    public text: string;
    public link: string;
    public isTargetBlank: boolean;

    constructor() { }

    ngOnInit() {
        this.textArea = this.data.textArea;
        this.formControl = this.data.formControl;
        this.text = this.textArea.value.slice(this.textArea.selectionStart, this.textArea.selectionEnd);
        console.log('data: ', this.data);
    }

    insertText() {
        // ищем элемент по id
        const txtarea = this.textArea;
        // ищем первое положение выделенного символа
        const start = txtarea.selectionStart;
        // ищем последнее положение выделенного символа
        const end = txtarea.selectionEnd;
        // текст до + вставка + текст после (если этот код не работает, значит у вас несколько id)
        const anchor = `<a href="${this.link}"${this.isTargetBlank ? ' target=\'_blank\'' : ''} class="news__text-link">` + this.text + '</a>';
        const finText = txtarea.value.slice(0, start) + anchor + txtarea.value.slice(end);

        // подмена значения
        txtarea.value = finText;
        this.formControl.setValue({
            blockType: 'description',
            blockOrderNumber: this.formControl.value.blockOrderNumber,
            blockDescription: finText
        });

        console.log('textarea: ', this.textArea.value);

        console.log('this.formControl: ', this.formControl);
        // возвращаем фокус на элемент
        txtarea.focus();
        // возвращаем курсор на место - учитываем выделили ли текст или просто курсор поставили
        txtarea.selectionEnd = ( start == end ) ? (end + anchor.length) : start + anchor.length;
    }
}
