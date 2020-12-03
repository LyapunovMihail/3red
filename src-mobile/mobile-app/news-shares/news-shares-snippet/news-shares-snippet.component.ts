import { Component, Input, OnInit } from '@angular/core';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Share, SHARES_UPLOADS_PATH } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import * as moment from 'moment';

@Component({
    selector: 'app-news-shares-snippet',
    templateUrl: './news-shares-snippet.component.html',
    styleUrls: ['./news-shares-snippet.component.scss']
})
export class NewsSharesSnippetComponent implements OnInit {

    @Input() public snippet: INewsSnippet | Share;

    public newsUploadsPath = `/${NEWS_UPLOADS_PATH}`;
    public sharesUploadsPath = `/${SHARES_UPLOADS_PATH}`;

    constructor() {
        moment.locale('ru');
    }

    ngOnInit() {
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
}
