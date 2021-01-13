import { Component, OnInit, Input } from '@angular/core';
import { project } from './mockProject';
import { JkObjectsListService } from '../../jk-objects-list/jk-objects-list.service';
import { OBJECTS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
declare const Swiper: any;

export interface IObjectSnippet {
    status: string;
    minPrice: any;
}

@Component({
    selector: 'app-object-item-projects',
    templateUrl: 'object-projects.component.html',
    styleUrls: [
        'object-projects.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        JkObjectsListService
    ]
})

export class ObjectProjectsComponent implements OnInit {

    @Input() public objectId;
    public mockProject = project;
    public currentSlide = 0;
    public uploadsPath = `/${OBJECTS_UPLOADS_PATH}`;

    public objects: IObjectSnippet[] = [];
    public snippets;
    public flats;

    public slider;

    constructor(
        public objectService: JkObjectsListService
    ) { }

    ngOnInit() {
        this.objectService.getSnippets()
            .subscribe((data) => {
                const tempObjects = data.filter(item => item._id !== this.objectId && item.publish);
                this.snippets = tempObjects.length && tempObjects.length > 5 ? this.getRandomObjects(tempObjects) : tempObjects;
                this.filterSnippets();
                this.getFlatsMinPrice(this.snippets);
            });
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mockProject.length - 4 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.mockProject.length - 1 ;
    }

    public filterSnippets() {
        const filteredSnippets: IObjectSnippet[] = [];
        if (this.snippets && this.snippets.length > 0) {
            this.snippets.forEach((item) => {
                if (item.publish) {
                    filteredSnippets.push(item);
                }
            });
        }
        this.snippets = filteredSnippets;
    }

    private getFlatsMinPrice(objects) {
        objects.forEach((item, i) => {
            this.objectService.getFlats({mod: item.mod, type: 'КВ,АП'})
                .subscribe(
                    data => this.getMinPrice(item, data, i),
                    error => console.log(error)
                );
        });
    }

    private getMinPrice(obj, flats, i) {
        const price = flats.map((el) => el.price);

        this.objects[i] = {
            status: obj.status,
            minPrice: price.length > 0 ? Number(Math.min(...price) / 1000000).toFixed(2) : obj.status === 'Готовые' ? 'Полностью распродан!' : false
        };

        setTimeout( () => this.sliderInit(), 1000);
    }

    private getRandomObjects(tempObjects) {
        const jkMas = [];
        if (tempObjects.length) {
            while (jkMas.length < 5) {
                const ind = this.getRandomInt(tempObjects.length - 1);
                if (!jkMas.find((item) => item._id === tempObjects[ind]._id)) {
                    console.log('1.1-getRandomObjects-push');
                    jkMas.push(tempObjects[ind]);
                }
            }
        }

        return jkMas;
    }

   private getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    public sliderInit() {

        if (this.slider) { return; }

        this.slider = new Swiper('.swiper-projects', {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 24,
            navigation: {
                nextEl: '.swiper-projects__btn_next',
                prevEl: '.swiper-projects__btn_prev',
                disabledClass: 'disabled',
            },
        });
    }

    public getSubtextContent(obj, i) {
        return this.objects[i] && this.objects[i].minPrice
            ? this.objects[i].minPrice === 'Полностью распродан!'
                ? this.objects[i].minPrice
                : `Квартиры от ${this.objects[i].minPrice} млн. руб.`
            : obj.status;
    }
}
