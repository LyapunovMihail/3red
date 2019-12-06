import { Component, OnInit, ElementRef } from '@angular/core';
import { mockSlider, nav } from './mockSlide';
import { SwipeSlides } from '../../../commons/swipe-slides.service';

@Component({
    selector: 'app-object-item-gallery',
    templateUrl: 'object-item-gallery.component.html',
    styleUrls: [
        'object-item-gallery.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        SwipeSlides
    ]
})

export class ObjectItemGalleryComponent implements OnInit {

    public slideList = mockSlider;
    public navList = nav;

    public navName = '';

    public currentSlide: number = 0;
    public scrollLeft = 0;
    public widthElem = 0;

    public leftEdge = 0;
    public rightEdge = 0;

    public showTimeline = true;

    public interval;

    constructor(
        private swipeSlider: SwipeSlides,
        private elRef: ElementRef,
    ) { }

    ngOnInit() {
        // this.slideShow();
        this.navName = this.navList[0].name;
        this.getWidth();
        // this.swipeInit();
        // this.swipeSlider.startPosition(1, this.elRef.nativeElement.querySelector('#slider'), 0, '%');
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.slideList.length - 1 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.slideList.length - 1 ;
    }

    // public slideShow() {
    //     this.interval = setInterval(() => {
    //         this.currentSlide < this.slideList.length - 1
    //             ? this.nextBtn()
    //             : this.currentSlide = 0;
    //     }, 5000);
    // }

    // public clearInt() {
    //     clearInterval(this.interval);
    //     this.showTimeline = false;
    // }
    public scroll(event) {
        this.scrollLeft = event.target.scrollLeft;
    }
    public getWidth() {
        let item = this.elRef.nativeElement.querySelector('.object-gallery__slider-wrap');

        this.widthElem = item.clientWidth - (item.clientWidth / 7);
    }

    public swipeInit() {
        let sliderWrap = this.elRef.nativeElement.querySelector('#sliderWrap');
        let slider = this.elRef.nativeElement.querySelector('#slider');
        let egLeft = this.elRef.nativeElement.querySelector('.gallery-slide__edge-left');
        let egRight = this.elRef.nativeElement.querySelector('.gallery-slide__edge-right');

        this.swipeSlider.sliderInit( sliderWrap, slider, egLeft, egRight, sliderWrap.offsetWidth, 'px' );
    }
}
