import { Component, OnInit, ElementRef } from '@angular/core';
import { AboutTeamAdminService } from './about-team-admin.service';
import { IAboutTeamTabsSnippet } from '../../../../serv-files/serv-modules/about/team-tabs-api/team-tabs.interfaces';
import { ABOUT_TEAM_UPLOADS_PATH, ITeamSnippet } from '../../../../serv-files/serv-modules/about/team-api/about-team.interfaces';
declare const Swiper: any;

@Component({
    selector: 'app-about-team',
    templateUrl: 'about-team.component.html',
    styleUrls: [
        'about-team.component.scss'
    ],
    providers: [AboutTeamAdminService]
})

export class AboutTeamComponent implements OnInit {

    public contentSnippets: ITeamSnippet[];
    public tabSnippet: IAboutTeamTabsSnippet;
    public switchOn = false;

    public currentTeam: ITeamSnippet;
    public currentTab: string;
    public teams: any;
    public activeSlide = 0;

    public uploadsPath = `/${ABOUT_TEAM_UPLOADS_PATH}`;

    public slider = [];

    constructor(
        public elRef: ElementRef,
        private aboutTeamService: AboutTeamAdminService,
    ) { }

    ngOnInit() {
        this.getTabsThanContent();
    }

    public getTabsThanContent() {
        this.aboutTeamService.getTabsSnippet().subscribe((data) => {
            this.refreshTabs(data);
        }, (error) => {
            console.error(error);
        });
    }

    public refreshTabs(data) {
        this.tabSnippet = data;
        if (this.tabSnippet) {
            this.switchOn = this.tabSnippet.switchOn;
        }
        this.getContent();
    }

    public getContent() {
        this.aboutTeamService.getContentSnippets().subscribe((data) => {
            this.contentSnippets = data;
            this.setTeams();
            setTimeout( () => this.swiperInit(), 2000);
        }, (error) => {
            console.error(error);
        });
    }

    private setTeams() {
        this.teams = {};
        this.tabSnippet.team.forEach((item) => {
           this.teams[item.name] = { unlimit: false, team: this.contentSnippets.find((team) => team.tab === item.name ) };
        });
    }

    public nextSlide() {
        this.activeSlide = this.activeSlide === 9 ? 0 : this.activeSlide + 1;
    }

    public prevSlide() {
        this.activeSlide = this.activeSlide === 0 ? 0 : this.activeSlide - 1;
    }

    swiperInit() {
        if ( !(this.switchOn && this.teams) ) { return; }

        const slider = this.elRef.nativeElement.querySelectorAll('.swiper-team');
        slider.forEach( slider => {
            this.slider.push(
                new Swiper(`#${slider.id}`, {
                    slidesPerView: 'auto',
                    watchOverflow: true,
                    spaceBetween: 24,
                })
            );
        });
    }
}
