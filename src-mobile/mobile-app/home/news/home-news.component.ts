import { Component, Input, OnInit } from '@angular/core';
import { Share, SHARES_UPLOADS_PATH } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { HomeNewsService } from './home-news.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';
declare const Swiper: any;

@Component({
    selector: 'app-home-news',
    templateUrl: 'home-news.component.html',
    styleUrls: [
        'home-news.component.scss'
    ],
    providers: [
        HomeNewsService
    ]
})

export class HomeNewsComponent implements OnInit {

    @Input()
    public pageName: string;

    public currentSnippets = [];

    public showSnippetType = 'all';

    public currentSlide = 0;

    public newsSnippets: INewsSnippet[] = [];
    public shareSnippets: Share[] = [];
    public allSnippets: any[] = [];

    public newsUploadsPath = `/${NEWS_UPLOADS_PATH}`;
    public sharesUploadsPath = `/${SHARES_UPLOADS_PATH}`;

    public slider;

    public navList = [
        { name: 'Все', link: 'all' },
        { name: 'Новости', link: 'news' },
        { name: 'Акции', link: 'shares' }
    ];

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        public objectNewsService: HomeNewsService
    ) { }

    ngOnInit() {
        this.getAllSnippets();
    }

    public getAllSnippets() {
        combineLatest(
            this.objectNewsService.getMainShares(),
            this.objectNewsService.getMainNews()
        ).pipe(map(([shares, news]) => {
                this.newsSnippets = news;
                this.shareSnippets = shares;
                return [...shares, ...news];
            })
        ).subscribe(
            (data: any[]) => {
                this.allSnippets = data;
                this.sortByDateOfCreate(this.allSnippets);
                this.changeType('all');
                setTimeout( () => this.sliderInit(), 2000);
            },
            (err) => console.log(err)
        );
    }

    private sortByDateOfCreate(snippets) {
        snippets.sort((a, b) => {
            return new Date(a.created_at) > new Date(b.created_at) ? -1 : 1;
        });
    }

    public changeType(type) {
        this.currentSlide = 0;
        this.showSnippetType = type;

        switch (type) {
            case 'all':
                this.currentSnippets = this.allSnippets.filter((item) => item.publish);
                if (this.slider) { setTimeout(() => this.slider.update(), 200); }
                break;
            case 'news':
                this.currentSnippets = this.newsSnippets.filter((item) => item.publish);
                if (this.slider) { setTimeout(() => this.slider.update(), 200); }
                break;
            case 'shares':
                this.currentSnippets = this.shareSnippets.filter((item) => item.publish);
                if (this.slider) { setTimeout(() => this.slider.update(), 200); }
                break;
        }
    }

    sliderInit() {

        if (this.slider) { return; }

        this.slider = new Swiper('.swiper-news', {
            slidesPerView: 'auto',
            watchOverflow: true,
            spaceBetween: 24,
            navigation: {
                nextEl: '.swiper-news__btn_next',
                prevEl: '.swiper-news__btn_prev',
            },
        });
    }
}
