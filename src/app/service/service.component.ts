import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthorizationObserverService } from '../authorization/authorization.observer.service';
import { IServiceSnippet } from '../../../serv-files/serv-modules/service/service-api/service.interfaces';
import { IServiceTabsSnippet } from '../../../serv-files/serv-modules/service/tabs-api/service-tabs.interfaces';
import { ServiceAdminService } from './service-content-admin/service-admin.service';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss'],
    providers : [
        ServiceAdminService
    ]
})

export class ServiceComponent implements OnInit, OnDestroy {

    public authorizationEvent;
    public isAuthorizated = false;

    public contentSnippet: IServiceSnippet;
    public tabSnippet: IServiceTabsSnippet;
    public switchOn = false;

    public closeTabsModal = true;
    public closeContentModal = true;

    public currentTab: string = 'null';

    constructor(
        private authorization: AuthorizationObserverService,
        private serviceAdminService: ServiceAdminService
    ) { }

    ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });
        this.getTabsThanContent();
    }

    public getTabsThanContent() {
        this.serviceAdminService.getTabsSnippet().subscribe((data) => {
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
                this.getContent();
            }
        }
    }

    public getContent() {
        this.serviceAdminService.getContentSnippetByTab(this.currentTab)
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
