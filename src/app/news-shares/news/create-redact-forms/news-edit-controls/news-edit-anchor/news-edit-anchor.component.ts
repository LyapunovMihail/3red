import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgModel } from '@angular/forms';

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

    @Input() public textArea;
    @Input() public fakeTextArea;
    @Output() public close: EventEmitter<any> = new EventEmitter();

    public text: string;
    public link: string;
    public isTargetBlank: boolean;

    constructor() { }

    ngOnInit() {
        this.text = this.textArea.value.slice(this.textArea.selectionStart, this.textArea.selectionEnd);
    }

    insertText() {
        // ищем элемент по id
        let txtarea = this.textArea;
        // ищем первое положение выделенного символа
        let start = txtarea.selectionStart;
        // ищем последнее положение выделенного символа
        let end = txtarea.selectionEnd;
        // текст до + вставка + текст после (если этот код не работает, значит у вас несколько id)
        let anchor = `<a href="${this.link}"${this.isTargetBlank ? ' target=\'_blank\'' : ''}>` + this.text + '</a>';
        let finText = txtarea.value.slice(0, start) + anchor + txtarea.value.slice(end);

        // подмена значения
        txtarea.value = finText;
        // возвращаем фокус на элемент
        txtarea.focus();
        // возвращаем курсор на место - учитываем выделили ли текст или просто курсор поставили
        txtarea.selectionEnd = ( start == end ) ? (end + anchor.length) : start + anchor.length;
    }
}
