import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-decoration-variation-item',
    templateUrl: './decoration-variation-item.component.html',
    styleUrls: ['./decoration-variation-item.component.scss']
})

export class DecorationVariationItemComponent {
    @Input() public item;
    @Input() public pageType;
}
