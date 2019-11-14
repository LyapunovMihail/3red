import { PROJECT_MARKERS, IProjectItem } from './../about.markers';
import { Component } from '@angular/core';

@Component({
    selector: 'app-about-builder',
    templateUrl: './about-builder.component.html',
    styleUrls: ['./about-builder.component.scss', './../about.component.scss'],
    providers : [
    ]
})

export class AboutBuilderComponent {

    public snippets: IProjectItem[] = PROJECT_MARKERS;

    constructor(
    ) { }
}
