import { Component, OnInit } from '@angular/core';
import { sliderItems } from './slider-items';

@Component({
    selector: 'app-about-stage',
    templateUrl: './about-stage.component.html',
    styleUrls: ['./about-stage.component.scss']
})

export class AboutStageComponent implements OnInit {
    public slides = sliderItems;
    public activeSlide = 0;
    public slideWidth: number;
    public showSlider = false;

    constructor() {}

    ngOnInit(): void {
        window.addEventListener('resize', () => {
            this.slideWidth = document.documentElement.clientWidth < 760 ? document.documentElement.clientWidth - 40 : 704;
            console.log('this.slideWidth: ', this.slideWidth);
            console.log('document.documentElement.clientWidth: ', document.documentElement.clientWidth);
        });
        this.slideWidth = document.documentElement.clientWidth < 760 ? document.documentElement.clientWidth - 40 : 704;
        console.log('this.slideWidth: ', this.slideWidth);
        console.log('document.documentElement.clientWidth: ', document.documentElement.clientWidth);
    }

    public nextSlide() {
        if (this.activeSlide === 9) {
            this.showSlider = false;
        }
        this.activeSlide = this.activeSlide === 9 ? 0 : this.activeSlide + 1;
    }

    public prevSlide() {
        if (this.activeSlide === 0) {
            this.showSlider = false;
        }
        this.activeSlide = this.activeSlide === 0 ? 0 : this.activeSlide - 1;
    }

    public scroll(event) {
        const scrollLeft = event.target.scrollLeft;
        this.activeSlide = Math.ceil((scrollLeft - (this.slideWidth + 150) / 2.5) / (this.slideWidth + 150)); // рассчитываем кол-во проскроленных слайдов
    }
}
