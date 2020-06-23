import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
    selector : 'app-news-list',
    templateUrl : './news-list.component.html',
    styleUrls: ['./news-list.component.scss']
})

export class NewsListComponent {

    @Input() public snippetsArray: INewsSnippet[] = [];

    public uploadsPath = `/${NEWS_UPLOADS_PATH}`;

    public activeTooltip: string;

    constructor() {
        moment.locale('ru');
    }

    public parseCreatedAtDate(date) {
        return moment(date).format('LL').slice(0, -3);
    }

    public onSelectItem(item: string): void {
        this.activeTooltip = this.activeTooltip === item ? '' : item;
    }
}
