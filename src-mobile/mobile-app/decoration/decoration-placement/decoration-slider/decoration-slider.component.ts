import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-decoration-slider',
    templateUrl: './decoration-slider.component.html',
    styleUrls: ['./decoration-slider.component.scss']
})

export class DecorationSliderComponent {
    @Input() slideList: any[] = [];
    @Input() activeIndex: number = 0;
    @Output() changeIndex: EventEmitter<number> = new EventEmitter();
}
