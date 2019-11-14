import {Component, OnInit} from '@angular/core';
import { NewsService } from '../news/news.service';
import { SharesService } from '../shares/shares.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlatformDetectService } from '../../platform-detect.service';
import { NEWS_UPLOADS_PATH } from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import { SHARES_UPLOADS_PATH } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import * as moment from 'moment';

@Component({
    selector: 'app-news-shares-all',
    templateUrl: './news-shares-all.component.html',
    styleUrls: ['./news-shares-all.component.scss'],
    providers: [
        PlatformDetectService,
        NewsService,
        SharesService
    ]
})

export class NewsSharesAllComponent implements OnInit {

    public allSnippets: any[] = [];
    public newsUploadsPath: string = `/${NEWS_UPLOADS_PATH}`;
    public sharesUploadsPath: string = `/${SHARES_UPLOADS_PATH}`;

    constructor(
        public platform: PlatformDetectService,
        public newsService: NewsService,
        public sharesService: SharesService
    ) { }

    public ngOnInit() {

        if ( !this.platform.isBrowser ) { return false; }

        combineLatest(
            this.sharesService.getShares(1000, 0),
            this.newsService.getSnippet()
        ).pipe(map(([shares, news]) => {
                return [...shares.sharesList, ...news];
            })
        ).subscribe(
            (data: any[]) => {
                this.allSnippets = data;
            },
            (err) => console.log(err)
        );

    }

    public countDown(finishDate) {
        const createdDateVal = moment(Date.now());
        const finishDateVal = moment(finishDate);
        const duration = moment.duration(createdDateVal.diff(finishDateVal));
        return Math.ceil(duration.asDays() * -1);
    }
}
