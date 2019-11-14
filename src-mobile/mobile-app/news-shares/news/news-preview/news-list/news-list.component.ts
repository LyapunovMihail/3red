import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})

export class NewsListComponent {

    @Input() public snippetsArray: INewsSnippet[] = [];

    public uploadsPath: string = `/${NEWS_UPLOADS_PATH}`;
}
