import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-decoration-slider-list-item',
    templateUrl: './decoration-slider-list-item.component.html',
    styleUrls: ['./decoration-slider-list-item.component.scss']
})

export class DecorationSliderListItemComponent {
    @Input() item: any;
    @Input() isActive: boolean;
}
