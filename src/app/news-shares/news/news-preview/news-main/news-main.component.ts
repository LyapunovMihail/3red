import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector : 'app-news-main',
    templateUrl : './news-main.component.html'
})

export class NewsMainComponent {

    @Input() public isAuthorizated: boolean = false;

    @Input() public snippetsArray: INewsSnippet[] = [];

    @Output() public deleteSnippet = new EventEmitter();

    @Output() public redactSnippet = new EventEmitter();

    uploadsPath: string = `/${NEWS_UPLOADS_PATH}`;

    constructor() { }

}
