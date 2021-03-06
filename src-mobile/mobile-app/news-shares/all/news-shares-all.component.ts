import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news/news.service';
import { SharesService } from '../shares/shares.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlatformDetectService } from '../../platform-detect.service';
import { NEWS_UPLOADS_PATH } from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import { SHARES_UPLOADS_PATH } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import * as moment from 'moment';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

@Component({
    selector: 'app-news-shares-all',
    templateUrl: './news-shares-all.component.html',
    styleUrls: ['./news-shares-all.component.scss'],
    providers: [
        PlatformDetectService,
        WindowScrollLocker,
        NewsService,
        SharesService
    ]
})

export class NewsSharesAllComponent implements OnInit {

    public snippets: any[] = [];
    public allSnippets: any[] = [];
    public newsUploadsPath = `/${NEWS_UPLOADS_PATH}`;
    public sharesUploadsPath = `/${SHARES_UPLOADS_PATH}`;

    public navList = [
        { name: 'Все', link: '/news-shares/all' },
        { name: 'Новости', link: '/news-shares/news' },
        { name: 'Акции', link: '/news-shares/shares' }
    ];

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        public platform: PlatformDetectService,
        public newsService: NewsService,
        public sharesService: SharesService
    ) { }

    public ngOnInit() {
        if ( !this.platform.isBrowser ) { return false; }

        moment.locale('ru');

        this.getAllSnippets();
    }

    public filterPublish() {
        this.snippets = this.allSnippets.filter((item) => item.publish);
    }

    public getAllSnippets() {
        combineLatest(
            this.sharesService.getShares(),
            this.newsService.getSnippet()
        ).pipe(map(([shares, news]) => {
                return [...shares, ...news];
            })
        ).subscribe(
            (data: any[]) => {
                this.snippets = data;
                this.allSnippets = data;
                this.sortByDateOfCreate(this.allSnippets);
                this.filterPublish();
            },
            (err) => console.log(err)
        );
    }

    private sortByDateOfCreate(snippets) {
        snippets.sort((a, b) => {
            return new Date(a.created_at) > new Date(b.created_at) ? -1 : 1;
        });
    }

    // вызывается после создания, удаления, редактирования
    public snippetsChange() {
        this.getAllSnippets();
    }
}
