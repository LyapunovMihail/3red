import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ImgModalService } from './img-modal.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
    selector: 'app-img-modal',
    template: `
        <div class="modal-plan" [class.modal-plan--active]="visible">
            <div>
                <img [src]="url" alt="">
            </div>
        </div>
    `,
    styleUrls: ['./img-modal.component.scss']
})
export class ImgModalComponent implements OnInit, OnDestroy {

    public visible: boolean;
    public url: string;

    private subs: Subscription[] = [];
    private _ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        private imgModalService: ImgModalService
    ) {}

    public ngOnInit() {
        this.subs.push(
            this.imgModalService.getImgVisibility
                .pipe(takeUntil(this._ngUnsubscribe))
                .subscribe((state: [boolean, string]) => {
                    this.visible = state[0];
                    this.url = state[1];
                })
        );
    }

    public ngOnDestroy() {
        this._ngUnsubscribe.next();
        this.subs.forEach((sub: Subscription) => {
            sub.unsubscribe();
        });
    }
}
