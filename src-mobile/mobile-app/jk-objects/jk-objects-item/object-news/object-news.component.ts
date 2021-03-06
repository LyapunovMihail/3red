import { Component, Input, OnInit } from '@angular/core';
import { Share, SHARES_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ObjectNewsService } from './object-news.service';
import { IObjectNewsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/news-api/objects-news.interfaces';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';
declare const Swiper: any;

@Component({
    selector: 'app-object-item-news',
    templateUrl: 'object-news.component.html',
    styleUrls: [
        'object-news.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        ObjectNewsService
    ]
})

export class ObjectNewsComponent implements OnInit {

    @Input()
    public objectId: string;
    @Input()
    public objectName: string;

    public currentSnippets = [];

    public showSnippetType = 'all';

    public currentSlide = 0;

    public newsSnippets: INewsSnippet[] = [];
    public shareSnippets: Share[] = [];
    public allSnippets: any[] = [];

    public objectSnippet: IObjectNewsSnippet;
    public switchOn = false;

    public redactId: string;
    public isNewsDeleteForm = false;
    public isNewsCreateRedactForm = false;
    public isSharesCreateRedactForm = false;
    public isSharesDeleteForm = false;
    public newsUploadsPath = `/${NEWS_UPLOADS_PATH}`;
    public sharesUploadsPath = `/${SHARES_UPLOADS_PATH}`;

    public navList = [
        { name: 'Все', link: 'all' },
        { name: 'Новости', link: 'news' },
        { name: 'Акции', link: 'shares' }
    ];

    public slider;

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        public objectNewsService: ObjectNewsService
    ) { }

    ngOnInit() {
        this.objectNewsService.getSnippetById(this.objectId).subscribe((data) => {
            this.objectSnippet = data;
            if (this.objectSnippet) {
                this.switchOn = this.objectSnippet.switchOn;
            }
        }, (error) => {
            console.error(error);
        });

        this.getAllSnippets();
    }

    public getAllSnippets() {
        combineLatest(
            this.objectNewsService.getObjectShares(this.objectId),
            this.objectNewsService.getObjectSnippet(this.objectId)
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

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.currentSnippets.length - 3 ) ? this.currentSlide + 1 : this.currentSnippets.length - 3;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : 0;
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
            breakpoints: {
                768: { slidesPerView: 2 }
            }
        });
    }
}
