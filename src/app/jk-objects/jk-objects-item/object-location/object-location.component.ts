import { Component, Input, OnInit } from '@angular/core';
import { mockNav } from './config/mockContent';
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

    public navPoint = mockNav;

    public contentSnippet: IObjectLocationSnippet;
    public tabSnippet: IObjectTabsSnippet;
    public objectId: string;
    public switchOn = false;

    public openPath = 'Объект';

    constructor(
        private locationService: ObjectLocationAdminService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        console.log('navPoint: ', this.navPoint);
    }

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.contentSnippet, objectId: this.objectId, switchOn: this.switchOn};
        this.locationService.setContentSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }
}
