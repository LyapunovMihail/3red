import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Share, SHARES_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ObjectNewsService } from './object-news.service';
import { IObjectNewsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/news-api/objects-news.interfaces';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';
import * as moment from 'moment';

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

export class ObjectNewsComponent implements OnInit, OnChanges {

    @Input()
    public isAuthorizated = false;
    @Input()
    public objectId: string;
    @Input()
    public objectName: string;

    public currentSnippets = [];

    public showSnippetType = 'all';

    public currentSlide = 0;

    public activeTooltip: string;

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

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.objectSnippet, objectId: this.objectId, switchOn: this.switchOn};
        this.objectNewsService.setSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }

    public createNewsSnippet() {
        if ( this.isAuthorizated ) {
            this.isNewsCreateRedactForm = true;
            this.windowScrollLocker.block();
        }
    }

    public redactNewsSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isNewsCreateRedactForm = true;
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

    public redactShareSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isSharesCreateRedactForm = true;
            this.windowScrollLocker.block();
        }
    }

    public deleteShareSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isSharesDeleteForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public updateNewsSnippet(snippet) {
        this.objectNewsService.updateNewsSnippet(snippet._id, snippet)
            .subscribe(
                () => console.log('success'),
                (err) => console.error(err)
            );
    }

    public updateShareSnippet(snippet) {
        this.objectNewsService.updateShareSnippet(snippet._id, snippet)
            .subscribe(
                () => console.log('success'),
                (err) => console.error(err)
            );
    }

    public parseDate(createdAt) {
        return moment(createdAt).format('LL').slice(0, -3);
    }
}
