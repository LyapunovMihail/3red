import { Component, Input, SimpleChanges, OnChanges } from '@angular/core';

@Component({
    selector: 'app-placement',
    templateUrl: './decoration-placement.component.html',
    styleUrls: ['./decoration-placement.component.scss']
})

export class DecorationPlacementComponent implements OnChanges {

    public activeIndex = 0;
    @Input() public slideList: string[];
    @Input() public name: string;
    @Input() public pageType: string;

    constructor(
    ) {}

    ngOnChanges(changes: SimpleChanges) {
        if ('pageType' in changes) {
            this.activeIndex = 0;
        }
    }
}
