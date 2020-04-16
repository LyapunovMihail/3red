import { Component, OnInit } from '@angular/core';
import { project } from './mockProject';

@Component({
    selector: 'app-object-item-projects',
    templateUrl: 'object-projects.component.html',
    styleUrls: [
        'object-projects.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectProjectsComponent implements OnInit {

    public mockProject = project;
    public currentSlide = 0;

    constructor() { }

    ngOnInit() { }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mockProject.length - 4 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.mockProject.length - 1 ;
    }
}
