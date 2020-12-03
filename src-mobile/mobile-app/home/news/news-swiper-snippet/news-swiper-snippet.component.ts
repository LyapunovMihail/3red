import { Component, Input, OnInit } from '@angular/core';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Share, SHARES_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import * as moment from 'moment';

@Component({
    selector: 'app-news-swiper-snippet',
    templateUrl: './news-swiper-snippet.component.html',
    styleUrls: ['./news-swiper-snippet.component.scss']
})
export class NewsSwiperSnippetComponent implements OnInit {

    @Input() public snippet: INewsSnippet | Share;

    public newsUploadsPath = `/${NEWS_UPLOADS_PATH}`;
    public sharesUploadsPath = `/${SHARES_UPLOADS_PATH}`;

    constructor() {
        moment.locale('ru');
    }

    ngOnInit() {
    }

    public parseCreatedAtDate(date) {
        return moment(date).format('LL').slice(0, -3);
    }
}
