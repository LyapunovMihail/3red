import { Component, OnDestroy, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { INewsSnippet } from '../../../serv-files/serv-modules/news-api/news.interfaces';
import { Share } from '../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { PlatformDetectService } from '../platform-detect.service';
import { AuthorizationObserverService } from '../authorization/authorization.observer.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    providers: [
        PlatformDetectService,
        HomeService
    ]
})

export class HomeComponent implements OnInit, OnDestroy {

    public allSnippets: INewsSnippet[] & Share[] = [];
    public newsSharesSnippets: INewsSnippet[] & Share[] | any = [];
    public newsLoaded = false;

    public authorizationEvent;
    public isAuthorizated = false;

    constructor(
        public platform: PlatformDetectService,
        private homeService: HomeService,
        private authorization: AuthorizationObserverService,
    ) {}

    public ngOnInit() {
        if ( !this.platform.isBrowser ) { return false; }

        this.getNewsAndSharesSnippets();
    }

    public subscribeAuth() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe((val) => {
            this.isAuthorizated = val;
            if (this.isAuthorizated) {
                this.newsSharesSnippets = this.allSnippets;
            } else {
                this.newsSharesSnippets = this.allSnippets.filter((item) => item.publish);
            }
        });
    }

    public getNewsAndSharesSnippets() {
        combineLatest(
            this.homeService.getMainShares(),
            this.homeService.getMainNews()
        ).pipe(map(([shares, news]) => {
                return [...shares, ...news];
            })
        ).subscribe(
            (data: any[]) => {
                this.newsSharesSnippets = data;
                this.allSnippets = data;
                this.sortByDateOfCreate(this.allSnippets);
                this.subscribeAuth();
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

    public ngOnDestroy() {
        this.authorizationEvent.unsubscribe();
    }
}
