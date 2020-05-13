import { PlatformDetectService } from '../../platform-detect.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-about-builder',
    templateUrl: './about-builder.component.html',
    styleUrls: ['./about-builder.component.scss'],
    providers : [
        PlatformDetectService
    ]
})

export class AboutBuilderComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public switchOn = false;

    public closeModal = true;

    constructor(
    ) {  }

    public ngOnInit() {
    }

}
