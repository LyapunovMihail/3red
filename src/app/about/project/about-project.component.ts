import { Component } from '@angular/core';
import { ABOUT_MARKERS, IAboutMarker } from '../about.markers';

@Component({
    selector: 'app-about-project',
    templateUrl: './about-project.component.html',
    styleUrls: ['./about-project.component.scss', './../about.component.scss']
})

export class AboutProjectComponent {

    public abouts: IAboutMarker [] = ABOUT_MARKERS;

}
