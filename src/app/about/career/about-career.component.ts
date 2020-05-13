import { PlatformDetectService } from '../../platform-detect.service';
import { Component, Input, OnInit } from '@angular/core';
import { AboutCareerAdminService } from './career-admin/about-career-admin.service';
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

    @Input()
    public isAuthorizated = false;

    public switchOn = false;

    public closeModal = true;
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
            console.log('this.contentSnippet: ', this.snippet);
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.snippet, switchOn: this.switchOn};
        this.careerService.setSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }
}
