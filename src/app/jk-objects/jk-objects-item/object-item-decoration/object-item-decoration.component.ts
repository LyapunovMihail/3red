import { Component, Input, OnInit } from '@angular/core';
import { slider } from './mockSlider';

@Component({
    selector: 'app-object-item-decoration',
    templateUrl: 'object-item-decoration.component.html',
    styleUrls: [
        'object-item-decoration.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemDecorationComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public mockSlider = slider;
    public sliderContent = slider[0];
    public currentSlide = 0;

    constructor() { }

    ngOnInit() {
        console.log(this.sliderContent);
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
}
