import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IDynamicImage, IDynamicObject, OBJECTS_DYNAMIC_UPLOADS_PATH } from '../../../../../../../serv-files/serv-modules/jk-objects/dynamic-api/objects-dynamic.interfaces';
import { MONTHARRAY } from '../../monthArray';

@Component({
    selector: 'app-object-dynamic-slideshow',
    templateUrl: './dynamic-gallery-slideshow.component.html',
    styleUrls: ['./dynamic-gallery-slideshow.component.scss']
})

export class ObjectDynamicSlideshowComponent {

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

    @Output() close: EventEmitter<boolean> = new EventEmitter();

    public monthArray: string[] = MONTHARRAY;
    public uploadsPath = `/${OBJECTS_DYNAMIC_UPLOADS_PATH}`;

    prev() {
        if (this.slideShowCurrent > 0) {
            this.slideShowCurrent -- ;
        } else {
            this.slideShowCurrent = this.slides.length - 1 ;
        }

        if(this.slides[this.slideShowCurrent].type == 'VIDEO') {
            do {
                if(this.slideShowCurrent > 0) {
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
