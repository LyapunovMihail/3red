import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { SHARES_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import * as moment from 'moment';

@Component({
    selector : 'app-news-shares-all-items',
    templateUrl : './news-shares-all-items.component.html',
    styleUrls: ['./news-shares-all-items.component.scss'],
})

export class NewsSharesAllItemsComponent {

    @Input() public isAuthorizated: boolean = false;

    @Input() public snippets: any[] = [];

    @Output() public deleteShareSnippet = new EventEmitter();
    @Output() public redactShareSnippet = new EventEmitter();
    @Output() public updateShareSnippet = new EventEmitter();

    @Output() public deleteNewsSnippet = new EventEmitter();
    @Output() public redactNewsSnippet = new EventEmitter();
    @Output() public updateNewsSnippet = new EventEmitter();

    public newsUploadsPath = `/${NEWS_UPLOADS_PATH}`;
    public sharesUploadsPath = `/${SHARES_UPLOADS_PATH}`;

    public activeTooltip: string;

    constructor() {
        moment.locale('ru');
    }

    public countDown(finishDate) {
        const createdDateVal = moment(Date.now());
        const finishDateVal = moment(finishDate);
        const duration = moment.duration(createdDateVal.diff(finishDateVal));
        return Math.ceil(duration.asDays() * -1);
    }

    public parseCreatedAtDate(date) {
        return moment(date).format('LL').slice(0, -3);
    }

    public onSelectItem(item: string): void {
        this.activeTooltip = this.activeTooltip === item ? '' : item;
    }
}
