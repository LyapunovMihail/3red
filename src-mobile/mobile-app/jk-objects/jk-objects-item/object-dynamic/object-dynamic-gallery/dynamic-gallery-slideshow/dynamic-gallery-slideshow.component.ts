import { Component, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { IDynamicImage, IDynamicObject, OBJECTS_DYNAMIC_UPLOADS_PATH } from '../../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { MONTHARRAY } from '../../monthArray';
declare let Swiper: any;

@Component({
    selector: 'app-object-dynamic-slideshow',
    templateUrl: './dynamic-gallery-slideshow.component.html',
    styleUrls: ['./dynamic-gallery-slideshow.component.scss']
})

export class ObjectDynamicSlideshowComponent implements AfterViewInit {

    @Input()
    public currentObject: IDynamicObject;
    @Input()
    public slides: IDynamicImage[];
    @Input()
    public slideShowCurrent = 0;
    @Input()
    public month: number;
    @Input()
    public year: number;

    public dynamicSlider;

    @Output() close: EventEmitter<boolean> = new EventEmitter();

    public monthArray: string[] = MONTHARRAY;
    public uploadsPath = `/${OBJECTS_DYNAMIC_UPLOADS_PATH}`;

    ngAfterViewInit() {

        setTimeout(() => {

            this.swiperInit();
        }, 1200);
    }

    public swiperInit() {
        this.dynamicSlider = new Swiper('.swiper-dynamic', {
            speed: 700,
            loop: false,
            effect: 'fade',
            slideActiveClass: 'dynamic-slider-current',
            navigation: {
              nextEl: '.dynamic-modal__btn_right',
              prevEl: '.dynamic-modal__btn_left'
            }
        });

        this.dynamicSlider.slideTo(this.slideShowCurrent);
    }
}
