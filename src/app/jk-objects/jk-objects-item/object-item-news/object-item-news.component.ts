import { Component, Input, OnInit } from '@angular/core';
import { newsArr } from './mockNews';

@Component({
    selector: 'app-object-item-news',
    templateUrl: 'object-item-news.component.html',
    styleUrls: [
        'object-item-news.component.scss',
        '../jk-objects-item.component.scss'
    ]
})

export class ObjectItemNewsComponent implements OnInit {

    @Input()
    public isAuthorizated = false;

    public mockNews = newsArr;
    public newsArr = [];

    public showSnippetType = 'all';

    public currentSlide = 0;

    public openTooltip = false;

    public activeTooltip: string;

    constructor() { }

    ngOnInit() {

        this.changeType('all');
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mockNews.length - 3 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.mockNews.length - 1 ;
    }

    public onSelectItem(item: string): void {

        this.activeTooltip = this.activeTooltip === item ? '' : item;
    }

    public changeType(type) {

        this.currentSlide = 0;
        this.newsArr = type === 'all' ? this.mockNews : this.mockNews.filter((news) => news.type === type);
        console.log(this.newsArr);
    }
}
