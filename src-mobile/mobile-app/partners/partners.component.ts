import { Component, OnInit, ElementRef } from '@angular/core';
import { IPartnersSnippet, PARTNERS_UPLOADS_PATH } from '../../../serv-files/serv-modules/partners/partners-api/partners.interfaces';
import { IPartnersTabsSnippet } from '../../../serv-files/serv-modules/partners/tabs-api/partners-tabs.interfaces';
import { PartnersAdminService } from './partners-admin.service';

@Component({
    selector: 'app-partners',
    templateUrl: './partners.component.html',
    styleUrls: ['./partners.component.scss'],
    providers : [
        PartnersAdminService
    ]
})

export class PartnersComponent implements OnInit {

    public contentSnippet: IPartnersSnippet;
    public tabSnippet: IPartnersTabsSnippet;
    public switchOn = false;

    public currentTab = 'null';

    public widthActive = 0;
    public offsetLeftActive = 0;

    public uploadsPath = `/${PARTNERS_UPLOADS_PATH}`;

    constructor(
        private partnersAdminService: PartnersAdminService,
        private elRef: ElementRef,
    ) { }

    ngOnInit() {
        this.getTabsThanContent();
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
                this.getContent();
                setTimeout(() => {
                    this.defaultElem();
                }, 1000);
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
