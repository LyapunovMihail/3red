import { NewsService } from '../news.service';
import { AuthorizationObserverService } from '../../../authorization/authorization.observer.service';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})

export class NewsListComponent implements OnInit, OnDestroy {

    public uploadsPath = `/${NEWS_UPLOADS_PATH}`;

    public snippetsArray: INewsSnippet[] = [];
    public allSnippets: INewsSnippet[] = [];

    public isAuthorizated = false ;

    // подписка на авторизацию
    public AuthorizationEvent;

    // открытие формы редактирования-создания
    public redactId: any ;
    public isCreateRedactForm = false;
    public isDeleteForm = false;

    public navList = [
        { name: 'Все', link: '/news-shares/all' },
        { name: 'Новости', link: '/news-shares/news' },
        { name: 'Акции', link: '/news-shares/shares' }
    ];

    constructor(
        private authorization: AuthorizationObserverService,
        public windowScrollLocker: WindowScrollLocker,
        private newsService: NewsService
    ) { }

    public ngOnInit(): void {
        this.getSnippets();
    }

    public subscribeAuth() {
        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe((val) => {
            this.isAuthorizated = val;
            if (this.isAuthorizated) {
                this.snippetsArray = this.allSnippets;
            } else {
                this.snippetsArray = this.allSnippets.filter((item) => item.publish);
            }
        });

    }

    public getSnippets() {
        this.newsService.getSnippet().subscribe(
            (data) => {
                this.snippetsArray = data;
                this.allSnippets = data;
                this.subscribeAuth();
            },
            (err) => console.error(err)
        );
    }

    public ngOnDestroy() {
        if (this.AuthorizationEvent) {
            this.AuthorizationEvent.unsubscribe();
        }
    }

    public createSnippet() {
        if ( this.isAuthorizated ) {
            this.redactId = null;
            this.isCreateRedactForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public redactSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isCreateRedactForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public deleteSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isDeleteForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public updateSnippet(snippet) {
        this.newsService.updateSnippet(snippet._id, snippet)
            .subscribe(
                () => console.log('success'),
                (err) => console.error(err)
            );
    }

    // вызывается после создания, удаления, редактирования
    public snippetsChange(data: INewsSnippet[]) {
        this.snippetsArray = data;
    }

}
