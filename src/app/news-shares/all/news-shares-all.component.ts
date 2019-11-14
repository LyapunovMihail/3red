import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsService } from '../news/news.service';
import { SharesService } from '../shares/shares.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { PlatformDetectService } from '../../platform-detect.service';
import {INewsSnippet, NEWS_UPLOADS_PATH} from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import { SHARES_UPLOADS_PATH } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
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

export class NewsSharesAllComponent implements OnInit, OnDestroy {

    public isAuthorizated = false ;
    public AuthorizationEvent;
    public allSnippets: any[] = [];
    public newsUploadsPath = `/${NEWS_UPLOADS_PATH}`;
    public sharesUploadsPath = `/${SHARES_UPLOADS_PATH}`;

    // открытие формы создания
    public isNewsCreateForm = false ;

    // открытие форм редактирования
    public redactId: any ;
    public isNewsRedactForm = false ;
    public isNewsDeleteForm = false ;
    public isSharesCreateRedactForm = false ;
    public isSharesDeleteForm = false ;

    constructor(
        private authorization: AuthorizationObserverService,
        public windowScrollLocker: WindowScrollLocker,
        public platform: PlatformDetectService,
        public newsService: NewsService,
        public sharesService: SharesService
    ) { }

    public ngOnInit() {
        if ( !this.platform.isBrowser ) { return false; }

        moment.locale('ru');

        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe((val) => {
            this.isAuthorizated = val;
        });

        this.getAllSnippets();
    }

    public ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    public getAllSnippets() {
        combineLatest(
            this.sharesService.getShares(1000, 0),
            this.newsService.getSnippet()
        ).pipe(map(([shares, news]) => {
                return [...shares.sharesList, ...news];
            })
        ).subscribe(
            (data: any[]) => {
                this.allSnippets = data;
                this.allSnippets.sort((a, b) => {
                    return new Date(a.created_at) > new Date(b.created_at) ? -1 : 1; // сортируем акции и новости по дате создания
                });

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

    public createNewsSnippet() {
        if ( this.isAuthorizated ) {
            this.isNewsCreateForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public redactNewsSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isNewsRedactForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public deleteNewsSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isNewsDeleteForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public createSharesSnippet() {
        if ( this.isAuthorizated ) {
            this.redactId = '0000-0000-0000';
            this.isSharesCreateRedactForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public redactSharesSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isSharesCreateRedactForm = true;
            this.windowScrollLocker.block();
        }
    }

    public deleteSharesSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isSharesDeleteForm = true ;
            this.windowScrollLocker.block();
        }
    }

    // вызывается после создания, удаления, редактирования
    public snippetsChange() {
        this.getAllSnippets();
    }

    public parseCreatedAtDate(date) {
        return moment(date).format('LL').slice(0, -3);
    }
}
