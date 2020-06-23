import { Component, OnInit } from '@angular/core';
import { AboutTeamAdminService } from './about-team-admin.service';
import { IAboutTeamTabsSnippet } from '../../../../serv-files/serv-modules/about/team-tabs-api/team-tabs.interfaces';
import { ABOUT_TEAM_UPLOADS_PATH, ITeamSnippet } from '../../../../serv-files/serv-modules/about/team-api/about-team.interfaces';

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

    public uploadsPath = `/${ABOUT_TEAM_UPLOADS_PATH}`;

    constructor(
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
}
