import { Component, Input, Output, EventEmitter } from '@angular/core';
import { SwipeSlides } from '../../../../../commons/swipe-slides.service';
import { IDynamicImage, IDynamicObject, OBJECTS_DYNAMIC_UPLOADS_PATH } from '../../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';

@Component({
    selector: 'app-object-dynamic-slideshow',
    templateUrl: './dynamic-object-slideshow.component.html',
    styleUrls: ['./dynamic-object-slideshow.component.scss'],
    providers: [
        SwipeSlides
    ]
})

export class ObjectDynamicSlideshowComponent {

    @Input()
    public currentObject: IDynamicObject;
    @Input()
    public slideShowCurrent = 0;
    @Input()
    public month: number;
    @Input()
    public year: number;

    @Output() close: EventEmitter<boolean> = new EventEmitter();

    public slides: IDynamicImage[] = this.currentObject.images;

    public uploadsPath = `/${OBJECTS_DYNAMIC_UPLOADS_PATH}`;

    constructor() {}

    prev() {
        if (this.slideShowCurrent > 0) {
            this.slideShowCurrent -- ;
        } else {
            this.slideShowCurrent = this.slides.length - 1 ;
        }

        if (this.slides[this.slideShowCurrent].type == 'VIDEO') {
            do {
                if (this.slideShowCurrent > 0) {
                    this.slideShowCurrent -- ;
                } else {
                    this.slideShowCurrent = this.slides.length - 1 ;
                }
            } while (this.slides[this.slideShowCurrent].type == 'VIDEO');
        }
    }

    next() {
        if (this.slideShowCurrent < this.slides.length - 1) {
            this.slideShowCurrent ++ ;
        } else {
            this.slideShowCurrent = 0 ;
        }

        if (this.slides[this.slideShowCurrent].type == 'VIDEO') {
            do {
                if (this.slideShowCurrent < this.slides.length - 1) {
                    this.slideShowCurrent ++ ;
                } else {
                    this.slideShowCurrent = 0;
                }
            } while (this.slides[this.slideShowCurrent].type == 'VIDEO');
        }
    }
}
