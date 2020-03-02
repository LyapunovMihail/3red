import { Component, Input, OnInit } from '@angular/core';
import { PlatformDetectService } from './../../../platform-detect.service';

import { navInfrastructure, mockNav } from './config/mockContent';
import { markersConfig } from './config/routes';
declare let ymaps: any;
declare let $: any;

@Component({
    selector: 'app-object-item-location',
    templateUrl: 'object-location.component.html',
    styleUrls: [
        'object-location.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectLocationComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    // Переменные которые я  создал что бы сделать верстку
    public infrastructure = navInfrastructure;
    public navPoint = mockNav;
    public mockMarkerRoutes = markersConfig;
    // /Переменные которые я  создал что бы сделать верстку

    public openPath = 'object';

    public asideTypeActive: string;

    public map: any;

    constructor(
        private platform: PlatformDetectService,
    ) { }

    ngOnInit() {
        this.initMap();
    }

    initMap() {
        if ( !this.platform.isBrowser ) { return false; }

        let that = this;
        this.map = ymaps.ready(() => {

            // создание новой карты с опциями
            let myMap = new ymaps.Map('map', {
                center: [55.673638, 37.861333],
                zoom: 12,
                controls: ['zoomControl'],
                behaviors: ['']
            }, {
                minZoom: 11,
                maxZoom: 18
            });
        });
    }
}
