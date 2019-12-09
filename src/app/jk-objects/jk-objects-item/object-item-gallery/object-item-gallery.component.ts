import { Component, OnInit } from '@angular/core';
import { mockSlider, nav } from './mockSlide';

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
    public navList = nav;
    public navName = '';

    public currentSlide: number = 0;

    public showTimeline = true;

    public interval;

    constructor() { }

    ngOnInit() {
        this.slideShow();
        this.navName = this.navList[0].name;
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.slideList.length - 1 ) ? this.currentSlide + 1 : 0;
        this.clearInt();
        this.slideShow();
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.slideList.length - 1 ;
        this.clearInt();
        this.slideShow();
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
        // this.showTimeline = false;
    }
}
