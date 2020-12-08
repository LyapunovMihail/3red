import { PlatformDetectService } from '../../../../platform-detect.service';
import { Component, ChangeDetectorRef, OnDestroy, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IObjectLocationSnippet, OBJECTS_LOCATION_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';
import { IObjectLocationTab } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
declare let ymaps: any;

// Приветствую тебя любознательный разработчик
// Этот компонент я делал в условиях крайне сжатых сроков
// поэтому степень костылизации здесь переходит всякие границы
// я попытался оставить подробные комментарии

@Component({
    selector: 'app-location-routes',
    templateUrl: './location-routes.component.html',
    styleUrls: [
        './../object-location.component.scss',
        './location-routes.component.scss'
    ]
})

export class LocationRoutesComponent implements OnDestroy, OnChanges {

    @Input() public contentSnippet: IObjectLocationSnippet;
    @Input() public routesTab: IObjectLocationTab;
    @Input() public officeTab: IObjectLocationTab;
    @Input() public tab: string;

    public map: any;
    public mainMarker: any;

    public page: string;

    public uploadsPath = `/${OBJECTS_LOCATION_UPLOADS_PATH}`;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private platform: PlatformDetectService,
        private ref: ChangeDetectorRef,
        private router: Router
    ) { }

    ngOnChanges(changes) {
        this.parseData();
        this.initMap();
    }

    private parseData() {
        if (this.routesTab || this.officeTab) {
            this.mainMarker = this.tab === 'Объект' ? this.routesTab : this.officeTab;
        }

        this.parseMarkers();
    }
    private parseMarkers() {
        this.mainMarker = {
            coords: this.mainMarker.coords.split(','),
            thumbnail: this.mainMarker.thumbnail,
            size: [50, 74],
            offset: [-20, -20],
            zIndex: 0,
            content: 1,
            tooltip: '',
            title: '',
            text: '',
            type: 'main'
        };
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
        this.map.destroy();
    }

    initMap() {
        if ( !this.platform.isBrowser ) { return false; }

        const that = this;
        ymaps.ready(() => {

            if (this.map) {
                this.map.destroy();
            }

            // создание новой карты с опциями

            that.map = new ymaps.Map('map', {
                center: that.mainMarker.coords,
                zoom: 12,
                controls: ['zoomControl']
            }, {
                minZoom: 9,
                maxZoom: 18
            });
            that.map.behaviors.disable('scrollZoom');

            const img = `<img class="marker-content__img" src="${this.uploadsPath + this.mainMarker.thumbnail}" width="56" height="56" />`;
            // для каждого маркера добавляем опции, тултипы, внутреннюю разметку
            const marker = new ymaps.Placemark(this.mainMarker.coords, {
                iconContent: `
                        <div class="marker-content marker-content__${this.mainMarker.type}">
                            ${img}
                            <span class="marker-content__text">${this.mainMarker.content}</span>
                            <div class="marker-content__tooltip marker-content__tooltip_${this.mainMarker.type}">
                                <div class="marker-content__tooltip-content marker-content__tooltip-content_${this.mainMarker.type}">
                                    <p class="marker-content__tooltip-content-title">${this.mainMarker.title}</p>
                                    <p class="marker-content__tooltip-content-text">${this.mainMarker.text}</p>
                                </div>
                            </div>
                        </div>`
            }, {
                // опции
                iconLayout: 'default#imageWithContent',
                iconImageHref: '/assets/img/location/marker-transparent.svg',
                iconImageSize: this.mainMarker.size,
                iconImageOffset: this.mainMarker.offset,
                zIndex: this.mainMarker.zIndex
            });

            that.map.geoObjects.add(marker);
        });

    }
}
