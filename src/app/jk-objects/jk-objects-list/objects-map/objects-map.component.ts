import { Component, Input, OnInit } from '@angular/core';
import { JkObjectsListService } from '../jk-objects-list.service';
import { IObjectSnippet } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
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

    constructor(
        private objectsListService: JkObjectsListService
    ) {
    }

    ngOnInit() {
        this.initMap();
    }

    private initMap() {
        ymaps.ready(function() {
            const myMap = new ymaps.Map('map', {
                    center: [55.751574, 37.573856],
                    zoom: 9,
                    controls: ['zoomControl']
                }),


                MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                    '<img src="/assets/img/mock/map-obj/obj1.jpg" class="img-map">'
                ),
                myPlacemarkWithContent = new ymaps.Placemark([55.661574, 37.573856], {
                        iconContent: ''
                    }
                    , {

                        iconLayout: 'default#imageWithContent',

                        iconImageHref: '',

                        iconImageSize: [64, 64],

                        iconImageOffset: [-24, -24],

                        iconContentOffset: [15, 15],

                        iconContentLayout: MyIconContentLayout
                    });
            myMap.behaviors.disable(['scrollZoom']);
            myMap.geoObjects
            // .add(myPlacemark)
                .add(myPlacemarkWithContent);

            myPlacemarkWithContent.events
                .add('mouseenter', function(e) {
                    // Ссылку на объект, вызвавший событие,
                    // можно получить из поля 'target'.
                    // e.get('target').options.set('preset', 'islands#greenIcon');
                    document.querySelector('.img-map').classList.add('img-map--hover');
                })
                .add('mouseleave', function(e) {
                    document.querySelector('.img-map').classList.remove('img-map--hover');
                });
        });
    }
}
