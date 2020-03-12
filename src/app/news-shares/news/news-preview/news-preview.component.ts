import { NewsService } from '../news.service';
import { AuthorizationObserverService } from '../../../authorization/authorization.observer.service';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
    selector: 'app-news-preview',
    templateUrl: './news-preview.component.html',
    providers: [
        WindowScrollLocker
    ]
})

export class NewsPreviewComponent implements OnInit, OnDestroy {

    public uploadsPath = `/${NEWS_UPLOADS_PATH}`;

    public snippetsArray: INewsSnippet[] = [];

    public isAuthorizated = false ;

    // подписка на авторизацию
    public AuthorizationEvent;

    // открытие формы редактирования-создания
    public redactId: any ;
    public isCreateRedactForm = false;
    public isDeleteForm = false;

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
                this.getSnippets();
            } else {
                this.snippetsArray = this.snippetsArray.filter((item) => item.publish);
            }
        });
    }

    public getSnippets() {
        this.newsService.getSnippet().subscribe(
            (data) => {
                this.snippetsArray = data;
                this.subscribeAuth();
            },
            (err) => console.error(err)
        );
    }

    public ngOnDestroy() {
        this.AuthorizationEvent.unsubscribe();
    }

    public createSnippet() {
        if ( this.isAuthorizated ) {
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

    // вызывается после создания, удаления, редактирования
    public snippetsChange(data: INewsSnippet[]) {
        console.log('data: ', data);
        this.snippetsArray = data;
    }

}
