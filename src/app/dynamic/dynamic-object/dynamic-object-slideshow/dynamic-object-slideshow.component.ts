import { IDynamicObject, DYNAMIC_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/dynamic-api/dynamic.interfaces';
import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
    selector: 'app-dynamic-object-slideshow',
    templateUrl: './dynamic-object-slideshow.component.html',
    styleUrls: ['./dynamic-object-slideshow.component.scss']
})

export class DynamicObjectSlideshowComponent implements OnChanges {

    @Input() objectsArray: IDynamicObject[] = [];
    @Input() slideShowCurrent: number = 0;
    @Input() slideShowId: any;
    @Input() isSlideShow: boolean = false;

    @Output() close: EventEmitter<boolean> = new EventEmitter();

    public uploadsPath: string = `/${DYNAMIC_UPLOADS_PATH}`;

    public slides = [];

    ngOnChanges() {
        if ( this.isSlideShow ) {
            this.slides = this.objectsArray.filter((i) => {
                return i._id === this.slideShowId;
            })[0]['images'];
        }
    }

    prev() {
        if(this.slideShowCurrent > 0){
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
        if(this.slideShowCurrent < this.slides.length - 1){
            this.slideShowCurrent ++ ;
        } else {
            this.slideShowCurrent = 0 ;
        }

        if(this.slides[this.slideShowCurrent].type == 'VIDEO') {
            do {
                if(this.slideShowCurrent < this.slides.length - 1) {
                    this.slideShowCurrent ++ ;
                } else {
                    this.slideShowCurrent = 0;
                }
            } while (this.slides[this.slideShowCurrent].type == 'VIDEO');
        }
    }

}
