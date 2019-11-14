import { Component } from '@angular/core';
import { GENPLAN_MARKERS, IGenplanMarker } from './../about.markers';

@Component({
    selector: 'app-about-genplan',
    templateUrl: './about-genplan.component.html',
    styleUrls: ['./about-genplan.component.scss', './../about.component.scss']
})

export class AboutGenplanComponent {

    public activeMarker: string;

    public markers: IGenplanMarker[] = GENPLAN_MARKERS;

    public onSelectItem(item: string): void {

        this.activeMarker === item ? this.activeMarker = '' : this.activeMarker = item;
    }
}
