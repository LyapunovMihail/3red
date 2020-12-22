import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { PlatformDetectService } from '../platform-detect.service';
import { INewsSnippet } from '../../../serv-files/serv-modules/news-api/news.interfaces';
import { Share } from '../../../serv-files/serv-modules/shares-api/shares.interfaces';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [
        PlatformDetectService,
        HomeService
    ]
})

export class HomeComponent implements OnInit {

    public allSnippets: INewsSnippet[] & Share[] = [];
    public newsSharesSnippets: INewsSnippet[] & Share[] | any = [];
    public newsLoaded = false;

    constructor(
        public platform: PlatformDetectService,
        private homeService: HomeService,
    ) {}

    public ngOnInit() {
        if ( !this.platform.isBrowser ) { return false; }

        this.getNewsAndSharesSnippets();
    }

    public filterPublish() {
        this.newsSharesSnippets = this.allSnippets.filter((item) => item.publish);
    }

    public getNewsAndSharesSnippets() {
        combineLatest(
            this.homeService.getPromoShares(),
            this.homeService.getPromoNews()
        ).pipe(map(([shares, news]) => {
                return [...shares, ...news];
            })
        ).subscribe(
            (data: any[]) => {
                this.newsSharesSnippets = data;
                this.allSnippets = data;
                this.sortByDateOfCreate(this.allSnippets);
                this.filterPublish();
                this.newsLoaded = true;
            },
            (err) => console.log(err)
        );
    }

    private sortByDateOfCreate(snippets) {
        snippets.sort((a, b) => {
            return new Date(a.created_at) > new Date(b.created_at) ? -1 : 1;
        });
    }
}
