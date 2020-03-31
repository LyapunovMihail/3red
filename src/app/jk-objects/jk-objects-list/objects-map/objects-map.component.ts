import { Component, Input, OnInit } from '@angular/core';
import { JkObjectsListService } from '../jk-objects-list.service';
import { IObjectSnippet, OBJECTS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
declare let ymaps: any;

@Component({
    selector: 'app-jk-objects-map',
    templateUrl: './objects-map.component.html',
    styleUrls: ['./objects-map.component.scss'],
    providers: [
        JkObjectsListService
    ]
})
export class ObjectsMapComponent implements OnInit {

    @Input()
    public snippets: IObjectSnippet[];

    public markers = [];

    public uploadsPath = `/${OBJECTS_UPLOADS_PATH}`;

    constructor(
    ) {
    }

    ngOnInit() {
        this.initMap();
    }

    private initMap() {

        ymaps.ready(() => {

                const myMap = new ymaps.Map('map', {
                        center: [55.751574, 37.573856],
                        zoom: 9,
                        controls: ['zoomControl']
                    });

                this.snippets.forEach((item, index) => {

                    this.markers[index] = {};
                    this.markers[index].click = false;
                    this.markers[index].id = item.objectId;
                    this.markers[index].thumbnail = item.thumbnail;
                    this.markers[index].name = item.name;
                    this.markers[index].status = item.status;

                    const MyIconContentLayout = `<img src="${this.uploadsPath + item.thumbnail}" id="img-map-${index}" class="img-map">`;

                    this.markers[index].marker = new ymaps.Placemark(item.coords.split(','), {
                            iconContent: MyIconContentLayout
                        }, {

                            iconLayout: 'default#imageWithContent',

                            iconImageHref: '',

                            iconImageSize: [64, 64],

                            iconImageOffset: [-24, -24],

                            iconContentOffset: [15, 15],
                        });
                    myMap.behaviors.disable(['scrollZoom']);
                    myMap.geoObjects
                    // .add(myPlacemark)
                        .add(this.markers[index].marker);

                    this.markers[index].marker.events
                        .add('mouseenter', (e) => {
                            // Ссылку на объект, вызвавший событие,
                            // можно получить из поля 'target'.
                            // e.get('target').options.set('preset', 'islands#greenIcon');
                            document.querySelector(`#img-map-${index}`).classList.add('img-map--hover');
                        })
                        .add('mouseleave', (e) => {
                            document.querySelector(`#img-map-${index}`).classList.remove('img-map--hover');
                        });
                });
        });
    }

    public sideMarkerHover(i) {
        document.querySelector(`#img-map-${i}`).classList.add('img-map--hover');
    }

    public sideMarkerDishover(i) {
        document.querySelector(`#img-map-${i}`).classList.remove('img-map--hover');
    }
}
