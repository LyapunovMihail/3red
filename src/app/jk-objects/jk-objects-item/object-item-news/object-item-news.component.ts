import { Component, OnInit } from '@angular/core';
import { news } from './mockNews';

@Component({
    selector: 'app-object-item-news',
    templateUrl: 'object-item-news.component.html',
    styleUrls: [
        'object-item-news.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemNewsComponent implements OnInit {

    public mockNews = news;

    public showSnippetType = 'all';

    public currentSlide = 0;

    public openTooltip = false;

    public activeTooltip: string;

    constructor() { }

    ngOnInit() { }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mockNews.length - 3 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.mockNews.length - 1 ;
    }

    public onSelectItem(item: string): void {

        this.activeTooltip === item ? this.activeTooltip = '' : this.activeTooltip = item;
    }
}