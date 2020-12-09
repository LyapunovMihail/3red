import { Component, OnInit } from '@angular/core';
import { PlatformDetectService } from '../platform-detect.service';

declare let ymaps: any;

@Component({
    selector: 'app-contacts',
    templateUrl: './contacts.component.html',
    styleUrls: ['./contacts.component.scss']
})

export class ContactsComponent implements OnInit {

    constructor(
        private platform: PlatformDetectService,
    ) {

    }

    ngOnInit() {
        if (!this.platform.isBrowser) { return; }

        ymaps.ready(() => {
            const myMap = new ymaps.Map('map', {
                center: [55.669894, 37.871373],
                zoom: 14,
                controls: ['zoomControl']
            });

            const MyIconContentLayout = ymaps.templateLayoutFactory.createClass(
                '<img src="/assets/img/contacts/marker.svg">'
            );
            const MyIconContentLayout2 = ymaps.templateLayoutFactory.createClass(
                '<img src="/assets/img/contacts/marker2.svg">'
            );


            const myPlacemarkWithContent = new ymaps.Placemark([55.6741332775072, 37.8586355], {
                    iconContent: ''
                }
                , {

                    iconLayout: 'default#imageWithContent',

                    iconImageHref: '',

                    iconImageSize: [64, 64],

                    iconImageOffset: [0, 0],

                    iconContentOffset: [0, 0],

                    iconContentLayout: MyIconContentLayout
                }
            );
            const myPlacemarkWithContent2 = new ymaps.Placemark([55.669894, 37.871373], {
                    iconContent: ''
                }
                , {

                    iconLayout: 'default#imageWithContent',

                    iconImageHref: '',

                    iconImageSize: [64, 64],

                    iconImageOffset: [0, 0],

                    iconContentOffset: [0, 0],

                    iconContentLayout: MyIconContentLayout2
                }
            );

            const polyline = new ymaps.Polyline([
                [55.673456, 37.859314],
                [55.673169, 37.860063],
                [55.673208, 37.860202],
                [55.672111, 37.862654],
                [55.671125, 37.865961],
                [55.670728, 37.866722],
                [55.670825, 37.866755],
                [55.670806, 37.867071],
                [55.670634, 37.867457],
                [55.671040, 37.868010],
                [55.669697, 37.870887],
                [55.669937, 37.871351]
            ], null, {
                strokeColor: '#EE473D',
                strokeWidth: 5,
                strokeStyle: '1 2'
            });


            myMap.behaviors.disable(['scrollZoom']);
            myMap.geoObjects
            // .add(myPlacemark)
                .add(myPlacemarkWithContent)
                .add(polyline)
                .add(myPlacemarkWithContent2);



        });
    }
}
