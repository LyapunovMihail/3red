import { DOCUMENT } from '@angular/platform-browser';
import { navList } from './config';
import { PlatformDetectService } from '../../../../platform-detect.service';
import { Component, Inject, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { IObjectLocationSnippet, OBJECTS_LOCATION_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';
import { IObjectLocationTab } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
declare let ymaps: any;
declare let $: any;

@Component({
    selector: 'app-location-infrastructure',
    templateUrl: './location-infrastructure.component.html',
     // стили для маркеров лежат отдельно /app/styles/ui-kit/_markers
    styleUrls: [
        './../object-location.component.scss',
        './location-infrastructure.component.scss'
    ]
})

export class LocationInfrastructureComponent implements OnInit, OnDestroy, OnChanges {

    @Input() public contentSnippet: IObjectLocationSnippet;
    @Input() public infraTab: IObjectLocationTab;

    public map: any;
    public markersConfig: any[] = [];
    public mainMarker: any;
    public destination: string[];

    // кнопки боковой навигации
    public navList = navList;
    public firstNavClick = true;
    // массив для временного хранения маркеров
    // чтобы можно было их находить при необходимости давать z-index
    // при выборе определенного типа
    public markers = [];

    public uploadsPath = `/${OBJECTS_LOCATION_UPLOADS_PATH}`;

    constructor(
        private platform: PlatformDetectService,
        @Inject(DOCUMENT) private document: any
    ) { }

    ngOnInit() {
        this.parseData();
        this.initMap();
    }

    ngOnChanges(changes) {
        this.map.destroy();
        this.markers = [];
        this.parseData();
        this.initMap();
    }

    private parseData() {
        if (this.infraTab) {
            this.mainMarker = this.infraTab;
            this.destination = this.mainMarker.coords.split(',');
        }

        this.parseMarkers();
    }
    private parseMarkers() {
        if (this.contentSnippet.data) {
            const contentSnippet = JSON.parse(JSON.stringify(this.contentSnippet));
            this.markersConfig = contentSnippet.data[2].infraMarks;
            this.markersConfig.forEach((mark) => {
                mark.coords = mark.coords.split(',');
            });
        }

        this.mainMarker = {
            coords: this.mainMarker.coords.split(','),
            thumbnail: this.mainMarker.thumbnail,
            size: [50, 74],
            offset: [-20, -20],
            zIndex: 0,
            content: this.markersConfig.length,
            tooltip: '',
            title: '',
            text: '',
            type: 'main'
        };
        this.markersConfig.push(this.mainMarker);
    }

    ngOnDestroy() {
        this.map.destroy();
    }

    openToolTip(type) {
        if ( !this.platform.isBrowser ) { return false; }

        // кнопки бокового меню
        if (this.firstNavClick) {
            this.markers.forEach((marker) => {
                if (marker.type !== type) {
                    $(`.location__infrastructure-list-item_${marker.type}`).removeClass('location__infrastructure-list-item_active');
                    marker.marker.options.set({
                        visible: false
                    });
                }
            });
            this.firstNavClick = false;
            return;
        }

        const item = $(`.location__infrastructure-list-item_${type}`);

        item.toggleClass('location__infrastructure-list-item_active');

        // всем выбранным маркерам через yamaps api добавляется видимость visible
        this.markers.forEach((marker) => {
            if (marker.type === type) {
                marker.marker.options.set({
                    visible: item.hasClass('location__infrastructure-list-item_active')
                });
            }
        });
    }

    // инициализация карты
    initMap() {
        if ( !this.platform.isBrowser ) { return false; }

        const that = this;
        ymaps.ready(() => {

            that.map = new ymaps.Map('map', {
                center: that.mainMarker.coords,
                zoom: 14,
                controls: ['zoomControl']
            }, {
                minZoom: 11,
                maxZoom: 18
            });

            // из маркер-конфига собираем массив маркеров
            that.markersConfig.forEach((item, index) => {
                that.markers[index] = {};
                that.markers[index].click = false;
                that.markers[index].type = item.type;
                const img = item.type === 'main' ? `<img class="marker-content__img" src="${this.uploadsPath + item.thumbnail}" width="56" height="56" />` : '';
                that.markers[index].marker = new ymaps.Placemark(item.coords, {
                    iconContent: `<div id="marker-${index}" class="marker-content marker-content__${item.type}">
                                ${img}
                                <div class="marker-content__tooltip">
                                    <div class="marker-content__tooltip-content">
                                        <p class="marker-content__tooltip-content-text">${item.name}</p>.
                                    </div>
                                </div>
                              </div>`
                }, {
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '/assets/img/location/marker-transparent.svg',
                    iconImageSize: (item.size) ? item.size : [30, 46],
                    iconImageOffset: (item.offset) ? item.offset : [-5, -15],
                    zIndex: 10
                });

                that.map.geoObjects.add(that.markers[index].marker);

                // Навешиваем события на маркеры. Если мышь над маркером - показываем маркер, если нет - убираем (если не было клика, если был - ховер не срабатывает).
                // Если клик по маркеру - показываем. Если повторный клик по маркеру - убираем.
                that.markers[index].marker.events.add('mouseenter', () => {
                    if (!that.markers[index].click) {
                        $(`#marker-${index}`).addClass('marker-content_active');
                    }
                });
                that.markers[index].marker.events.add('mouseleave', () => {
                    if (!that.markers[index].click) {
                        $(`#marker-${index}`).removeClass('marker-content_active');
                    }
                });
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
