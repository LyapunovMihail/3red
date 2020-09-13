import { Component, OnInit, ElementRef } from '@angular/core';
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

    public widthActive = 0;
    public offsetLeftActive = 0;

    constructor(
        private serviceAdminService: ServiceAdminService,
        private elRef: ElementRef,
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
                setTimeout(() => {
                    this.defaultElem();
                }, 1000);
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

    public defaultElem() {
        const el = this.elRef.nativeElement.querySelector('.active');
        this.widthActive = el && el.offsetWidth ? el.offsetWidth : null;
        this.offsetLeftActive = el && el.offsetLeft ? el.offsetLeft : null;
    }
    public getActiveElement(event, value) {
        const elem = event.target;

        this.widthActive = elem.offsetWidth;
        this.offsetLeftActive = elem.offsetLeft;

        this.changeTab(value);
    }
}
