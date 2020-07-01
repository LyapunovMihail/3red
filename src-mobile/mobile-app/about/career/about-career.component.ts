import { PlatformDetectService } from '../../platform-detect.service';
import { Component, OnInit } from '@angular/core';
import { AboutCareerAdminService } from './about-career-admin.service';
import { ICareerSnippet } from '../../../../serv-files/serv-modules/about/career-api/about-career.interfaces';

@Component({
    selector: 'app-about-career',
    templateUrl: './about-career.component.html',
    styleUrls: ['./about-career.component.scss'],
    providers : [
        PlatformDetectService,
        AboutCareerAdminService
    ]
})

export class AboutCareerComponent implements OnInit {

    public switchOn = false;
    public snippet: ICareerSnippet;

    constructor(
        private careerService: AboutCareerAdminService
    ) {}

    public ngOnInit() {
        this.getContent();
    }

    public getContent() {
        this.careerService.getSnippet().subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }
}
