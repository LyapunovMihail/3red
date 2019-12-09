import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { WindowScrollLocker } from '../commons/window-scroll-block';

@Component({
    selector: 'app-admin-modal',
    template: `
        <section class="g-modal-bg modal">
            <div class="modal__container">
                <button class="modal__close modal__close_main btn-cls" (click)="close(false)"><span></span></button>
                <button class="modal__close modal__close_success btn-success" [class.btn-disabled]="!formValid" (click)="close(true)" [disabled]="!formValid"></button>
                <ng-content></ng-content>
                <div class="modal__wrap modal__wrap_btn">
                    <button class="modal__success-btn modal__success-btn_success btn_var-2" (click)="close(true)" [disabled]="!formValid">Сохранить и закрыть</button>
                    <button class="modal__success-btn modal__success-btn_cancel" (click)="close(false)">Отменить</button>
                </div>
            </div>
        </section>
    `,
    styleUrls: ['./admin-modal.component.scss']
})
export class AdminModalComponent implements OnInit {

    @Input()
    public formValid: boolean;

    @Output()
    public closeModal = new EventEmitter<boolean>();

    constructor(
        public windowScrollLocker: WindowScrollLocker
    ) { }

    ngOnInit() {
        this.windowScrollLocker.block();
    }

    public close(isSave) {
        this.windowScrollLocker.unblock();
        this.closeModal.emit(isSave);
    }
}
