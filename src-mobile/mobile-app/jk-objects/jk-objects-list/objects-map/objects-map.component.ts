import { ChangeDetectorRef, Component, Input, OnChanges, OnDestroy } from '@angular/core';
import { JkObjectsListService } from '../jk-objects-list.service';
import { IObjectSnippet, OBJECTS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { Router } from '@angular/router';
declare let ymaps: any;

@Component({
    selector: 'app-jk-objects-map',
    templateUrl: './objects-map.component.html',
    styleUrls: ['./objects-map.component.scss'],
    providers: [
        JkObjectsListService
    ]
})
export class ObjectsMapComponent implements OnChanges, OnDestroy {

    @Input()
    public snippets: IObjectSnippet[];

    public markers = [];
    public map: any;
    public ready: any;
    public uploadsPath = `/${OBJECTS_UPLOADS_PATH}`;

    constructor(
        public ref: ChangeDetectorRef,
        private router: Router
    ) {
    }

    ngOnChanges(changes) {
        this.markers = [];
        this.initMap();
    }

    ngOnDestroy() {
        this.map.destroy();
    }

    private initMap() {

        ymaps.ready(() => {

                if (this.map) {
                    this.map.destroy();
                }

                this.map = new ymaps.Map('map', {
                        center: [55.751574, 37.573856],
                        zoom: 9,
                        controls: ['zoomControl']
                    });

                this.map.behaviors.disable('drag');

                this.snippets.forEach((item, index) => {

                    this.markers[index] = {};
                    this.markers[index].click = false;
                    this.markers[index].id = item._id;
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

                            zIndex: 1
                        });
                    this.map.behaviors.disable(['scrollZoom']);
                    this.map.geoObjects
                    // .add(myPlacemark)
                        .add(this.markers[index].marker);

                    this.markers[index].marker.events
                        .add('mouseenter', (e) => {
                            // Ссылку на объект, вызвавший событие,
                            // можно получить из поля 'target'.
                            // e.get('target').options.set('preset', 'islands#greenIcon');
                            document.querySelector(`#objects__map-item-${index}`).classList.add('objects__map-item--hover');
                            document.querySelector(`#img-map-${index}`).classList.add('img-map--hover');
                            this.markers[index].marker.options.set({
                                zIndex: 10
                            });
                        })
                        .add('mouseleave', (e) => {
                            document.querySelector(`#objects__map-item-${index}`).classList.remove('objects__map-item--hover');
                            document.querySelector(`#img-map-${index}`).classList.remove('img-map--hover');
                            this.markers[index].marker.options.set({
                                zIndex: 1
                            });
                        })
                        .add('click', (e) => {
                            this.router.navigate([`/objects/list/${this.markers[index].id}`]);
                        });
                });
                this.ref.detectChanges();
        });
    }

    public sideMarkerHover(i) {
        document.querySelector(`#objects__map-item-${i}`).classList.add('objects__map-item--hover');
        document.querySelector(`#img-map-${i}`).classList.add('img-map--hover');
        this.markers[i].marker.options.set({
            zIndex: 10
        });
    }

    public sideMarkerDishover(i) {
        document.querySelector(`#objects__map-item-${i}`).classList.remove('objects__map-item--hover');
        document.querySelector(`#img-map-${i}`).classList.remove('img-map--hover');
        this.markers[i].marker.options.set({
            zIndex: 1
        });
    }
}
