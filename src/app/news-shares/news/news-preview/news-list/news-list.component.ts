import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector : 'app-news-list',
    templateUrl : './news-list.component.html'
})

export class NewsListComponent {

    @Input() public isAuthorizated: boolean = false;

    @Input() public snippetsArray: INewsSnippet[] = [];

    @Output() public deleteSnippet = new EventEmitter();

    @Output() public redactSnippet = new EventEmitter();

    public uploadsPath: string = `/${NEWS_UPLOADS_PATH}`;

    constructor() {
        moment.locale('ru');
    }

    public parseCreatedAtDate(date) {
        return moment(date).format('LL').slice(0, -3);
    }
}
