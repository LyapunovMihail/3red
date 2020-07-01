import { Component, OnInit } from '@angular/core';
import { IServiceSnippet } from '../../../serv-files/serv-modules/service/service-api/service.interfaces';
import { IServiceTabsSnippet } from '../../../serv-files/serv-modules/service/tabs-api/service-tabs.interfaces';
import { ServiceAdminService } from './service-admin.service';

@Component({
    selector: 'app-service',
    templateUrl: './service.component.html',
    styleUrls: ['./service.component.scss'],
    providers : [
        ServiceAdminService
    ]
})

export class ServiceComponent implements OnInit {

    public contentSnippet: IServiceSnippet;
    public tabSnippet: IServiceTabsSnippet;
    public switchOn = false;

    public currentTab = 'null';

    constructor(
        private serviceAdminService: ServiceAdminService
    ) { }

    ngOnInit() {
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

}
