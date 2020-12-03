import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Share, SHARES_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { map } from 'rxjs/operators';
import { combineLatest } from 'rxjs';
import { ObjectNewsService } from './object-news.service';
import { IObjectNewsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/news-api/objects-news.interfaces';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';

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
    @Input()
    public objectMod: string;

    public currentSnippets = [];

    public showSnippetType = 'all';

    public currentSlide = 0;

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

    public navList = [
        { name: 'Все', link: 'all' },
        { name: 'Новости', link: 'news' },
        { name: 'Акции', link: 'shares' }
    ];

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
            this.objectNewsService.getObjectNews(this.objectId)
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
            this.redactId = null;
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
}
