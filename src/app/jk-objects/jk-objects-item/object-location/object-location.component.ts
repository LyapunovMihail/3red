import { Component, Input, OnInit } from '@angular/core';
import { ObjectLocationAdminService } from './object-location-content-admin/object-location-admin.service';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IObjectLocationSnippet } from '../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-object-item-location',
    templateUrl: 'object-location.component.html',
    styleUrls: [
        'object-location.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        ObjectLocationAdminService
    ]
})

export class ObjectLocationComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    @Input()
    public objectName: string;
    @Input()
    public objectCoords: string;

    public isTabSet = false;

    public contentSnippet: IObjectLocationSnippet;
    public tabSnippet: IObjectTabsSnippet;
    public objectId: string;
    public switchOn = false;

    public openTab = 'Объект';
    public mockTabs = ['Объект', 'Офис продаж', 'Инфраструктура'];

    public closeTabsModal = true;
    public closeContentModal = true;

    constructor(
        private locationService: ObjectLocationAdminService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        this.getTabsThanContent();
    }

    public getTabsThanContent() {
        this.locationService.getTabsSnippetById(this.objectId).subscribe((data) => {
            this.refreshTabs(data);
        }, (error) => {
            console.error(error);
        });
    }

    public refreshTabs(data) {
        this.tabSnippet = data;
        if (this.tabSnippet && this.tabSnippet.location) {
            if (this.tabSnippet.location.length && this.tabSnippet.location.some((tab) => tab.show)) {
                const tab = this.tabSnippet.location.find((item) => item.show);
                if (tab) {
                    this.isTabSet = true;
                    this.openTab = tab.name;
                }
            }
        }
        this.getContent();
    }

    public getContent() {
        this.locationService.getContentSnippet(this.objectId).subscribe((data) => {
            this.contentSnippet = data;
            console.log('this.contentSnippet: ', this.contentSnippet);
            if (this.contentSnippet) {
                this.switchOn = this.contentSnippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });
    }

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.contentSnippet, objectId: this.objectId, switchOn: this.switchOn};
        this.locationService.setContentSnippetData(data).subscribe(
            (res) => this.contentSnippet = res,
            (err) => console.error(err)
        );
    }
}
