import { Component, OnInit } from '@angular/core';
import { mockSlider } from './mockSlide';

@Component({
    selector: 'app-object-item-gallery',
    templateUrl: 'object-item-gallery.component.html',
    styleUrls: [
        'object-item-gallery.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemGalleryComponent implements OnInit {

    public slideList = mockSlider;

    public currentSlide: number = 0;

    public showTimeline = true;

    public interval;

    constructor() { }

    ngOnInit() {
        this.slideShow();
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.slideList.length - 1 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.slideList.length - 1 ;
    }

    public slideShow() {
        this.interval = setInterval(() => {
            this.currentSlide < this.slideList.length - 1
                ? this.nextBtn()
                : this.currentSlide = 0;
        }, 5000);
    }

    public clearInt() {
        clearInterval(this.interval);
        this.showTimeline = false;
    }
}
