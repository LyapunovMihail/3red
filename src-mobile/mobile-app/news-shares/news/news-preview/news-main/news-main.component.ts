import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, Input } from '@angular/core';

@Component({
    selector : 'app-news-main',
    templateUrl : './news-main.component.html'
})

export class NewsMainComponent {

    @Input() public snippetsArray: INewsSnippet[] = [];

    uploadsPath = `/${NEWS_UPLOADS_PATH}`;

    constructor() { }
}
