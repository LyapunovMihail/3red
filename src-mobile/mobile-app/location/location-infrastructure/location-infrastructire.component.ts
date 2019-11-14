import { DOCUMENT } from '@angular/platform-browser';
import { markersConfig } from './config';
import { PlatformDetectService } from './../../platform-detect.service';
import { Component, Inject, OnInit } from '@angular/core';
declare let ymaps: any;
declare let $: any;

@Component({
    selector: 'app-location-infrastructure',
    templateUrl: './location-infrastructire.component.html',
     // стили для маркеров лежат отдельно /app/styles/ui-kit/_markers
    styleUrls: ['./location-infrastructire.component.scss']
})

export class LocationInfrastructureComponent implements OnInit {

    // массив для временного хранения маркеров
    // чтобы можно было их находить при необходимости давать z-index
    // при выборе определенного типа
    public markers = [];

    constructor(
        private platform: PlatformDetectService,
        @Inject(DOCUMENT) private document: any
    ) { }

    ngOnInit() {
        this.initMap();
    }

    // инициализация карты
    initMap() {
        if ( !this.platform.isBrowser ) { return false; }

        const that = this;
        ymaps.ready(() => {

            const myMap = new ymaps.Map('map', {
                center: [55.656355158866056, 37.9214221574383],
                zoom: 16,
                controls: []
            }, {
                minZoom: 11,
                maxZoom: 18
            });

            // из маркер-конфига собираем массив маркеров
            markersConfig.forEach( ( item, index ) => {
                that.markers[index] = {};
                that.markers[index].click = false;
                that.markers[index].type = item.type;
                that.markers[index].marker = new ymaps.Placemark(item.coord, {
                    iconContent: `<div id="marker-${index}" class="marker-content marker-content__${item.type}">${item.content}</div>`
                }, {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '/assets/img/location/marker-transparent.svg',
                    iconImageSize: (item.size) ? item.size : [30, 46],
                    iconImageOffset: (item.offset) ? item.offset : [-5, -15],
                    zIndex: 10
                });

                myMap.geoObjects.add(that.markers[index].marker);

                // Если клик по маркеру - показываем. Если повторный клик по маркеру - убираем.
                that.markers[index].marker.events.add('click', () => {
                    that.markers[index].click = !that.markers[index].click;
                    $('.marker-content').removeClass('marker-content_active');
                    if (that.markers[index].click) {
                        $(`#marker-${index}`).addClass('marker-content_active');
                    } else {
                        $(`#marker-${index}`).removeClass('marker-content_active');
                    }
                });
            });
        });

    }
}
