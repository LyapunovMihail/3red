import { destination } from './config';
import { PlatformDetectService } from '../../../../platform-detect.service';
import { Component, ChangeDetectorRef, OnDestroy, Input, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { IObjectLocationSnippet, OBJECTS_LOCATION_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/jk-objects/location-api/objects-location.interfaces';
import { IObjectLocationTab } from '../../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
declare let ymaps: any;
declare let $: any;

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
    public markersConfig: any[] = [];
    public mainMarker: any;
    public destination: string[];

    // номер активного маркера для подсветки нужных маршрутов и ссылок бокового меню
    // берется из config.content
    public linkActive = 1;
    public asideTypeActive: string;

    // временное хранилище маркеров, их конфигов и маршрутов им принадлежащих
    public markers = [];

    public page: string;

    public uploadsPath = `/${OBJECTS_LOCATION_UPLOADS_PATH}`;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private platform: PlatformDetectService,
        private ref: ChangeDetectorRef,
        private router: Router
    ) { }

    ngOnChanges(changes) {
        this.markers = [];
        this.parseData();
        this.initMap();
    }

    private parseData() {
        if (this.routesTab || this.officeTab) {
            this.mainMarker = this.tab === 'Объект' ? this.routesTab : this.officeTab;
            this.destination = this.mainMarker.coords.split(',');
        }

        this.parseMarkers();
    }
    private parseMarkers() {
        if (this.contentSnippet.data) {
            const contentSnippet = JSON.parse(JSON.stringify(this.contentSnippet));
            this.markersConfig = contentSnippet.data[0].routesMarks;
            this.markersConfig.forEach((mark) => {
                mark.coords = mark.coords.split(',');
                mark.text = mark.place + ' (' + mark.info + ')';
                mark.route.origin = [mark.route.origin.split(',')];
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

            that.markersConfig.forEach((item: any, index) => {
                    that.markers[index] = {};

                    const img = item.type === 'main' ?  `<img class="marker-content__img" src="${this.uploadsPath + item.thumbnail}" width="56" height="56" />` : '';
                    // для каждого маркера добавляем опции, тултипы, внутреннюю разметку
                    const marker = new ymaps.Placemark(item.coords, {
                        iconContent: `
                        <div class="marker-content marker-content__${item.type}">
                            ${img}
                            <span class="marker-content__text">${item.content}</span>
                            <div class="marker-content__tooltip marker-content__tooltip_${item.type}">
                                <div class="marker-content__tooltip-content marker-content__tooltip-content_${item.type}">
                                    <p class="marker-content__tooltip-content-title">${item.title}</p>
                                    <p class="marker-content__tooltip-content-text">${item.text}</p>
                                </div>
                            </div>
                        </div>`
                    }, {
                        // опции
                        iconLayout: 'default#imageWithContent',
                        iconImageHref: '/assets/img/location/marker-transparent.svg',
                        iconImageSize: item.size,
                        iconImageOffset: item.offset,
                        zIndex: item.zIndex
                    });

                    // все маркеры добавляем во временное хранилище
                    that.markers[index].marker = marker;
                    // так же добавляем каждому конфиг
                    that.markers[index].config = item;

                    // добавляем маркеры на карту
                    that.map.geoObjects.add(that.markers[index].marker);

                    // Далее в работу берутся те маркеры, у которых
                    // в конфиге есть объект route или его тип polyline.

                    // У первого маркера из markersConfig (тип polyline), заданы координаты
                    // точек, по которым рисуется линия, эмулируя проложение маршрута поезда
                    // иначе не получается отрисовать маршрут по рельсам,
                    // т.к. Яндекс.Карты не предоставляют возможность выбора только лишь поезда
                    // есть возможность выбора общественного транспорта, но тогда могут
                    // отрисоваться несколько маршрутов, для автобуса, метро, поезда,
                    // а такой вариант не подходит

                    // Прим. у главного маркера нет маршрута
                    // поэтому работа с ним ограничилась созданием/добавлением выше
                    if ('route' in item) {

                        // созддаем на карте маршруты для каждого маркера
                        ymaps.route([
                            ...item.route.origin, destination
                        ]).then((route) => {
                            route.getPaths().options.set({
                                strokeColor: (item.content === 1) ? item.route.activeColor : item.route.color,
                                strokeWidth: 5,
                                strokeStyle: item.route.strokeStyle,
                                zIndex: 10,
                                openBalloonOnClick: false
                            });
                            // во временное хранилище к нужному маркеру добавляем объект с созданным маршрутом
                            that.markers[index].route = route;
                            // добавляем маршрут на карту
                            that.map.geoObjects.add(route.getPaths(that.markers[index].route));
                        });

                        // при наведении на маркер, если он не активен ( проверяется zIndex в опциях маршрута )
                        that.markers[index].marker.events.add('mouseenter', () => {
                            const markerZIndex = that.markers[index].route._paths.options._options.zIndex;
                            if (markerZIndex !== 100) {
                                // добавляем ему активный цвет из его конфигов и дополнительный zIndex
                                that.markers[index].route.getPaths().options.set({
                                    strokeColor: that.markers[index].config.route.activeColor,
                                    zIndex: 101
                                });
                            }
                        });

                        // при уведении курсора возвращаем маршрут маркера в предыдущее состояние
                        that.markers[index].marker.events.add('mouseleave', () => {
                            const markerZIndex = that.markers[index].route._paths.options._options.zIndex;
                            if (markerZIndex !== 100) {
                                that.markers[index].route.getPaths().options.set({
                                    strokeColor: that.markers[index].config.route.color,
                                    zIndex: 10
                                });
                            }
                        });

                        // на все маркеры (кроме главного) вешается клик для изменения активного маршрута и тултипа
                        that.markers[index].marker.events.add('click', () => {
                            that.changeRoute(that.markers[index]);
                        });
                    }
                });

                // после инициализации надо обновить состояние компонента принудительно
                // иначе не создается боковая навигация по новому массиву маркеров/маршрутов
            that.ref.detectChanges();
            that.map.setBounds(that.map.geoObjects.getBounds(), {checkZoomRange: true});
        });

    }

    // вызывается при клике на все маркеры кроме главного
    // и при клике на ссылки боковой панели навигации
    // меняет активный маршрут
    changeRoute( val ) {

        const markerContent = $('.marker-content');
        const markerContentArr = Array.prototype.slice.call(markerContent);

        this.markers.forEach( ( marker ) => {
            // для всех маршрутов
            if ( 'route' in marker ) {
                // устанавливается не активное состояние
                marker.route.getPaths().options.set({
                    strokeColor: marker.config.route.color,
                    zIndex: 10
                });
            }
            marker.marker.options.set({zIndex: 10}); // прячем неактивные маркеры под активными чтобы не перекрывали тултипы активных маркеров
        });

        val.marker.options.set({zIndex: 110}); // ставим активные маркеры над неактивными чтобы закрывать тултипами неактивные

        if ('route' in val) {
            // иначе для переданного аргумента(маркера)
            // добавляем актив к его маршруту
            val.route.getPaths().options.set({
                strokeColor: val.config.route.activeColor,
                zIndex: 100
            });
        }

        // так же активному маркеру добавляется активный класс для тултипов
        markerContentArr.forEach( ( elem ) => {
            const elemInnerText = elem.querySelector('.marker-content__text').innerText;
            if ( Number(elemInnerText) === val.config.content ) {
                elem.classList.add('marker-content_active');
            } else {
                elem.classList.remove('marker-content_active');
            }
        });

        // активную ссылку обновляем
        this.linkActive = val.config.content;

        // и детектим изменения в компоненте принудительно
        this.ref.detectChanges();
    }
}
