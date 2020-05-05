import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Share, SHARES_UPLOADS_PATH } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { HomeNewsService } from './home-news.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';
import * as moment from 'moment';

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

export class HomeNewsComponent implements OnInit, OnChanges {

    @Input()
    public isAuthorizated = false;

    public currentSnippets = [];

    public showSnippetType = 'all';

    public currentSlide = 0;

    public activeTooltip: string;

    public newsSnippets: INewsSnippet[] = [];
    public shareSnippets: Share[] = [];
    public allSnippets: any[] = [];

    public newsUploadsPath = `/${NEWS_UPLOADS_PATH}`;
    public sharesUploadsPath = `/${SHARES_UPLOADS_PATH}`;

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        public objectNewsService: HomeNewsService
    ) { }

    ngOnInit() {

        this.getAllSnippets();
    }

    ngOnChanges(changes: SimpleChanges) {
        if ('isAuthorizated' in changes) {
            if (this.isAuthorizated) {
                this.currentSnippets = this.showSnippetType === 'all' ? this.allSnippets : this.showSnippetType === 'news' ? this.newsSnippets : this.shareSnippets;
            } else {
                this.currentSnippets = this.currentSnippets.filter((item) => item.publish);
            }
        }
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
                console.log('this.newsSnippets: ', this.newsSnippets);
                this.allSnippets.sort((a, b) => {
                    return new Date(a.created_at) > new Date(b.created_at) ? -1 : 1; // сортируем акции и новости по дате создания
                });
                this.changeType(this.allSnippets, 'all');
            },
            (err) => console.log(err)
        );
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.currentSnippets.length - 3 ) ? this.currentSlide + 1 : this.currentSnippets.length - 3;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : 0;
    }

    public onSelectItem(item: string): void {
        this.activeTooltip = this.activeTooltip === item ? '' : item;
    }

    public changeType(snippets, type) {
        this.currentSlide = 0;
        this.showSnippetType = type;

        this.currentSnippets = this.isAuthorizated ? snippets : snippets.filter((item) => item.publish);
    }


    public parseDate(createdAt) {
        return moment(createdAt).format('LL').slice(0, -3);
    }
}
