import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Share, SHARES_UPLOADS_PATH } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { HomeNewsService } from './home-news.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

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
                this.sortByDateOfCreate(this.allSnippets);
                this.changeType('all');
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
                this.currentSnippets = this.isAuthorizated ? this.allSnippets : this.allSnippets.filter((item) => item.publish);
                break;
            case 'news':
                this.currentSnippets = this.isAuthorizated ? this.newsSnippets : this.newsSnippets.filter((item) => item.publish);
                break;
            case 'shares':
                this.currentSnippets = this.isAuthorizated ? this.shareSnippets : this.shareSnippets.filter((item) => item.publish);
                break;
        }
    }
}
