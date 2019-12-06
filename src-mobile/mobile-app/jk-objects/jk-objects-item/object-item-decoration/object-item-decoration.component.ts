import { Component, OnInit, ElementRef } from '@angular/core';
import { slider } from './mockSlider';
import { SwipeSlides } from '../../../commons/swipe-slides.service';

@Component({
    selector: 'app-object-item-decoration',
    templateUrl: 'object-item-decoration.component.html',
    styleUrls: [
        'object-item-decoration.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        SwipeSlides
    ]
})

export class ObjectItemDecorationComponent implements OnInit {

    public mockSlider = slider;
    public sliderContent = slider[0];
    public currentSlide = 0;
    public scrollLeft = 0;
    public widthElem = 0;

    public mediaCurrentSlide = 0;
    public leftEdge = 0;
    public rightEdge = 0;

    constructor(
        public swipeSlider: SwipeSlides,
        private elRef: ElementRef
    ) { }

    ngOnInit() {
        this.swipeInit();
        this.swipeSlider.startPosition(1, this.elRef.nativeElement.querySelector('#slider'), 0, '%');
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.sliderContent.img.length - 1 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.sliderContent.img.length - 1 ;
    }

    public changeNav(num) {
        this.currentSlide = 0;
        this.sliderContent = this.mockSlider[num];
    }

    public swipeInit() {
        let sliderWrap = this.elRef.nativeElement.querySelector('#sliderWrap');
        let slider = this.elRef.nativeElement.querySelector('#slider');
        let egLeft = this.elRef.nativeElement.querySelector('.gallery-slide__edge-left');
        let egRight = this.elRef.nativeElement.querySelector('.gallery-slide__edge-right');

        this.swipeSlider.sliderInit( sliderWrap, slider, egLeft, egRight, sliderWrap.offsetWidth, 'px' );
        this.mediaCurrentSlide = this.swipeSlider.counter;
    }
}
