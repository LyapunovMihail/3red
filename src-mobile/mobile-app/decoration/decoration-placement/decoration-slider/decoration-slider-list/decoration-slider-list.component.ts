import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-decoration-slider-list',
    templateUrl: './decoration-slider-list.component.html',
    styleUrls: ['./decoration-slider-list.component.scss']
})

export class DecorationSliderListComponent {
    @Input() slideList: any[] = [];
    @Input() activeIndex: number = 0;
}
