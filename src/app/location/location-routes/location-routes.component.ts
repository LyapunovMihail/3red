import { markersConfig, destination } from './config';
import { PlatformDetectService } from './../../platform-detect.service';
import { Component, ChangeDetectorRef, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
declare let ymaps: any;
declare let $: any;

// Приветствую тебя любознательный разработчик
// Этот компонент я делал в условиях крайне сжатых сроков
// поэтому степень костылизации здесь переходит всякие границы
// я попытался оставить подробные комментарии

@Component({
    selector: 'app-location-routes',
    templateUrl: './location-routes.component.html',
    styleUrls: ['./../location.component.scss']
})

export class LocationRoutesComponent implements OnInit, OnDestroy {

    // номер активного маркера для подсветки нужных маршрутов и ссылок бокового меню
    // берется из config.content
    public linkActive: number = 1;
    public asideTypeActive: string;

    public map: any;

    // временное хранилище маркеров, их конфигов и маршрутов им принадлежащих
    public markers = [];

    public page: string;

    private ngUnsubscribe: Subject<void> = new Subject<void>();

    constructor(
        private platform: PlatformDetectService,
        private ref: ChangeDetectorRef,
        private router: Router
    ) { }

    ngOnInit() {
        // если страница офиса, то удаляем главный маркер роутов, если страница роутов, то удаляем главный маркер офиса
        if (this.router.url === '/location/routes') {
            markersConfig[markersConfig.length - 1].title = 'ЖК Новотомилино';
            markersConfig[markersConfig.length - 1].class = 'marker-content marker-content__main-marker';
            this.page = 'routes';
        } else if (this.router.url === '/location/office') {
            markersConfig[markersConfig.length - 1].title = 'Офис продаж';
            markersConfig[markersConfig.length - 1].class = 'marker-content marker-content__office-marker';
            this.page = 'office';
        }
        // инициализация карты
        this.initMap();
    }

    ngOnDestroy() {
        this.ngUnsubscribe.next();
        this.ngUnsubscribe.complete();
    }

    initMap() {
        if ( !this.platform.isBrowser ) { return false; }

        let that = this;
        this.map = ymaps.ready(() => {

            // создание новой карты с опциями
            let myMap = new ymaps.Map('map', {
                center: [55.673638, 37.861333],
                zoom: 12,
                controls: ['zoomControl']
            }, {
                minZoom: 11,
                maxZoom: 18
            });

            markersConfig.forEach( ( item: any, index ) => {
                that.markers[index] = {};

                // для каждого маркера добавляем опции, тултипы, внутреннюю разметку
                let marker = new ymaps.Placemark(item.coords, {
                    iconContent: `
                        <div class="${item.class}">
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
                that.markers[index]['marker'] = marker;
                // так же добавляем каждому конфиг
                that.markers[index]['config'] = item;

                // добавляем маркеры на карту
                myMap.geoObjects.add(that.markers[index]['marker']);

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
                if ('route' in item || item.type === 'polyline') {

                    //  если тип polyline
                    if ( item.type === 'polyline' ) {
                        // Создаем ломаную с помощью вспомогательного класса Polyline.
                        let myPolyline = new ymaps.Polyline([
                            // из конфигов берем точки координат
                            ...item.lineCoords
                        ], null, {
                            // доп. опции
                            strokeColor: 'rgb(46,46,46)',
                            strokeWidth: 5,
                            strokeOpacity: 1,
                            zIndex : 100
                        });

                        // во временное хранилище к нужному маркеру добавляем объект с созданной линией
                        that.markers[index]['polyline'] = myPolyline;
                        // Добавляем линию на карту.
                        myMap.geoObjects.add(that.markers[index]['polyline']);

                        // при наведении на маркер (если он не активен) линия становится непрозрачной
                        that.markers[index]['marker'].events.add('mouseenter', () => {
                            let markerZIndex = that.markers[index]['polyline'].options._options.zIndex;
                            if ( markerZIndex !== 100 ) {
                                that.markers[index]['polyline'].options.set('strokeOpacity', 1).set('zIndex', 101);
                            }
                        });

                        // при уведении с него курсора, линия возвращается в предыдущее состояние
                        that.markers[index]['marker'].events.add('mouseleave', () => {
                            let markerZIndex = that.markers[index]['polyline'].options._options.zIndex;
                            if ( markerZIndex !== 100 ) {
                                that.markers[index]['polyline'].options.set('strokeOpacity', .6).set('zIndex', 10);
                            }
                        });

                    // если маркер не имеет polyline, а это все маркеры кроме главного
                    } else {

                        // созддаем на карте маршруты для каждого маркера
                        ymaps.route([
                            ...item['route'].origin, destination
                        ]).then( (route) => {
                            route.getPaths().options.set({
                                strokeColor: (item.content === 1) ? item['route'].activeColor : item['route'].color,
                                strokeWidth: 5,
                                strokeStyle: item['route'].strokeStyle,
                                zIndex: 10,
                                openBalloonOnClick: false
                            });
                            // во временное хранилище к нужному маркеру добавляем объект с созданным маршрутом
                            that.markers[index]['route'] = route;
                            // добавляем маршрут на карту
                            myMap.geoObjects.add(route.getPaths(that.markers[index]['route']));
                        });

                        // при наведении на маркер, если он не активен ( проверяется zIndex в опциях маршрута )
                        that.markers[index]['marker'].events.add('mouseenter', () => {
                            let markerZIndex = that.markers[index]['route']._paths.options._options.zIndex;
                            if ( markerZIndex !== 100 ) {
                                // добавляем ему активный цвет из его конфигов и дополнительный zIndex
                                that.markers[index]['route'].getPaths().options.set({
                                    strokeColor: that.markers[index]['config']['route'].activeColor,
                                    zIndex: 101
                                });
                            }
                        });

                        // при уведении курсора возвращаем маршрут маркера в предыдущее состояние
                        that.markers[index]['marker'].events.add('mouseleave', () => {
                            let markerZIndex = that.markers[index]['route']._paths.options._options.zIndex;
                            if ( markerZIndex !== 100 ) {
                                that.markers[index]['route'].getPaths().options.set({
                                    strokeColor: that.markers[index]['config']['route'].color,
                                    zIndex: 10
                                });
                            }
                        });
                    }

                    // на все маркеры (кроме главного) вешается клик для изменения активного маршрута и тултипа
                    that.markers[index]['marker'].events.add('click', () => {
                        that.changeRoute(that.markers[index]);
                    });
                }
            });

            // на главный маркер вешается клик для изменения активного тултипа
            that.markers[that.markers.length - 1]['marker'].events.add('click', () => {
                that.changeRoute(that.markers[that.markers.length - 1]);
            });

            // после инициализации надо обновить состояние компонента принудительно
            // иначе не создается боковая навигация по новому массиву маркеров/маршрутов
            that.ref.detectChanges();
        });

    }

    // вызывается при клике на все маркеры кроме главного
    // и при клике на ссылки боковой панели навигации
    // меняет активный маршрут
    changeRoute( val ) {
        if ( !this.platform.isBrowser ) { return false; }

        let markerContent = $('.marker-content');
        let markerContentArr = Array.prototype.slice.call(markerContent);

        this.markers.forEach( ( marker ) => {
            // для всех маршрутов
            if ( 'route' in marker ) {
                // устанавливается не активное состояние
                marker['route'].getPaths().options.set({
                    strokeColor: marker['config']['route'].color,
                    zIndex: 10
                });
            }
            // для одного маркера с линией вместо маршрута
            if ( marker.config.type === 'polyline' && 'polyline' in marker ) {
                // на линию так же ставится не активное состояние
                marker.polyline.options.set('strokeOpacity', .6).set('zIndex', 10);
            }
            marker['marker'].options.set({zIndex: 10}); // прячем неактивные маркеры под активными чтобы не перекрывали тултипы активных маркеров
        });

        val['marker'].options.set({zIndex: 110}); // ставим активные маркеры над неактивными чтобы закрывать тултипами неактивные

        // если в аргументах передано значение маркера с линией
        if ( val.config.type === 'polyline' && 'polyline' in val ) {
            // то для линии добавляется активное состояние
            val.polyline.options.set('strokeOpacity', 1).set('zIndex', 100);
        } else if ('route' in val) {
            // иначе для переданного аргумента(маркера)
            // добавляем актив к его маршруту
            val['route'].getPaths().options.set({
                strokeColor: val['config']['route'].activeColor,
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
