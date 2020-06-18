import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'app-loader',
    styleUrls: ['./loader.component.scss'],
    template: `
        <div class="data-preloader" *ngIf="loaderShow" [style.height.px]="loaderHeight ? loaderHeight : ''">
            <div class="data-preloader__ring">
                <div class="lds-ring">
                    <div></div>
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>
        </div>`,
})

export class LoaderComponent implements OnInit {

    @Input() public loaderHeight;
    @Input() public loaderShow = false;

    constructor() { }

    ngOnInit() { }
}
