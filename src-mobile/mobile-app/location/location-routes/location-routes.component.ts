import { Router } from '@angular/router';
import { PlatformDetectService } from '../../platform-detect.service';
import { Component, OnInit } from '@angular/core';
declare let ymaps: any;

@Component({
    selector: 'app-routes',
    templateUrl: './location-routes.component.html',
    styleUrls: ['./location-routes.component.scss']
})

export class LocationRoutesComponent implements OnInit {

    public marker: string;
    public page: string;

    constructor(
        private platform: PlatformDetectService,
        private router: Router
    ) {}

    ngOnInit() {
        if (this.router.url === '/location/routes') {
            this.marker = `<div class="main_map_marker"></div>`;
            this.page = 'routes';
        } else if (this.router.url === '/location/office') {
            this.marker = '<div class="office_map_marker"></div>';
            this.page = 'office';
        }

        this.initMap();
    }

    initMap() {
        if (!this.platform.isBrowser) { return; }

        ymaps.ready( () => {
            let myMap = new ymaps.Map('map', {
                center: [55.656355158866056, 37.9214221574383],
                zoom: 17,
                controls: []
            }, {
                minZoom: 11,
                maxZoom: 18
            });

            let marker = new ymaps.Placemark([55.656355158866056, 37.9214221574383], {
                iconContent: this.marker
            }, {
                iconLayout: 'default#imageWithContent',
                iconImageHref: '/assets/img/location/marker-transparent.svg',
                iconImageSize: [50, 75],
                iconImageOffset: [-25, -75],
            });

            myMap.geoObjects.add(marker);
        });

    }
}
