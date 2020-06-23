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

    public newsSnippets: INewsSnippet[] = [];
    public shareSnippets: Share[] = [];
    public allSnippets: any[] = [];
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

        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });

        combineLatest(
            this.homeService.getMainShares(),
            this.homeService.getMainNews()
        ).pipe(map(([shares, news]) => {
                this.newsSnippets = news;
                this.shareSnippets = shares;
                return [...shares, ...news];
            })
        ).subscribe(
            (data: any[]) => {
                this.allSnippets = data;
                this.newsLoaded = true;
            },
            (err) => console.log(err)
        );
    }

    public ngOnDestroy() {
        this.authorizationEvent.unsubscribe();
    }
}
