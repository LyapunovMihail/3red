import { PROJECT_MARKERS, IProjectItem } from '../about.markers';
import { PlatformDetectService } from '../../platform-detect.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-about-builder',
    templateUrl: './about-builder.component.html',
    styleUrls: ['./about-builder.component.scss', './../about.component.scss'],
    providers : [
        PlatformDetectService
    ]
})

export class AboutBuilderComponent implements OnInit {

    public projects: IProjectItem[] = PROJECT_MARKERS;

    constructor(
    ) {  }

    public ngOnInit() {
    }

}
