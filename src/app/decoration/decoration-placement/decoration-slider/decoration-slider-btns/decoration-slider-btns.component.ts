import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-decoration-slider-btns',
    templateUrl: './decoration-slider-btns.component.html',
    styleUrls: ['./decoration-slider-btns.component.scss']
})

export class DecorationSliderBtnsComponent {
    @Input() slideList: any[] = [];
    @Input() activeIndex: number = 0;
    @Output() changeIndex: EventEmitter<number> = new EventEmitter();
}
