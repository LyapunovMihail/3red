import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { INewsSnippet } from '../../../serv-files/serv-modules/news-api/news.interfaces';
import { Share } from '../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { PlatformDetectService } from '../platform-detect.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [
        PlatformDetectService,
        HomeService
    ]
})

export class HomeComponent implements OnInit {

    public newsSnippets: INewsSnippet[] = [];
    public shareSnippets: Share[] = [];
    public allSnippets: any[] = [];
    public mainNews: INewsSnippet[] = [];
    public mainShares: Share[] = [];
    public newsLoaded = false;

    constructor(
        public platform: PlatformDetectService,
        private homeService: HomeService
    ) {}

    public ngOnInit() {

        if ( !this.platform.isBrowser ) { return false; }

        combineLatest(
            this.homeService.getShares(),
            this.homeService.getNews()
        ).pipe(map(([shares, news]) => {
                this.newsSnippets = news;
                this.shareSnippets = shares.sharesList;
                this.mainNews = this.makeArrayCopy(this.newsSnippets);
                this.mainShares = this.makeArrayCopy(this.shareSnippets);
                return [...shares.sharesList, ...news];
            })
        ).subscribe(
            (data: any[]) => {
                this.allSnippets = data;
                this.newsLoaded = true;
            },
            (err) => console.log(err)
        );
    }

    public makeArrayCopy(snippetArr) {
        return JSON.parse(JSON.stringify(snippetArr));
    }

}
