import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationObserverService } from '../authorization/authorization.observer.service';
import { IPartnersSnippet, PARTNERS_UPLOADS_PATH } from '../../../serv-files/serv-modules/partners/partners-api/partners.interfaces';
import { IPartnersTabsSnippet } from '../../../serv-files/serv-modules/partners/tabs-api/partners-tabs.interfaces';
import { PartnersAdminService } from './partners-content-admin/partners-admin.service';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
    providers : [
        PartnersAdminService
    ]
})

export class PartnersComponent implements OnInit, OnDestroy {

    public authorizationEvent;
    public isAuthorizated = false;

    public contentSnippet: IPartnersSnippet;
    public tabSnippet: IPartnersTabsSnippet;
    public switchOn = false;

    public closeTabsModal = true;
    public closeContentModal = true;

    public currentTab = 'null';

    public navList = [];

    uploadsPath = `/${PARTNERS_UPLOADS_PATH}`;

    constructor(
        private authorization: AuthorizationObserverService,
        private partnersAdminService: PartnersAdminService
    ) { }

    ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });

        this.getTabsThanContent();
    }

    private setTabs() {
        this.navList = [{ name: 'Все', link: 'null', show: true }, ...this.tabSnippet.tab];
        console.log('this.navList: ', this.navList);
    }

    public getTabsThanContent() {
        this.partnersAdminService.getTabsSnippet().subscribe((data) => {
            this.refreshTabs(data);
        }, (error) => {
            console.error(error);
        });
    }

    public refreshTabs(data) {
        this.tabSnippet = data;
        if (this.tabSnippet) {
            if (this.tabSnippet.tab && this.tabSnippet.tab.length && this.tabSnippet.tab.some((tab) => tab.show)) {
                // this.currentTab = this.tabSnippet.tab.find((tab) => tab.show).name;
                this.setTabs();
                this.getContent();
            }
        }
    }

    public getContent() {
        this.partnersAdminService.getContentSnippetByTab(this.currentTab)
            .subscribe(
                (data) => this.contentSnippet = data,
                (error) => console.error(error)
            );
    }

    public changeTab(tab) {
        this.currentTab = tab;
        this.getContent();
    }

    public ngOnDestroy() {
        this.authorizationEvent.unsubscribe();
    }
}
