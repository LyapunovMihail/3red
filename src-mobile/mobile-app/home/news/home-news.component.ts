import {Component, Input, OnInit } from '@angular/core';
import {INewsSnippet, NEWS_UPLOADS_PATH} from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import {Share, SHARES_UPLOADS_PATH} from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import * as moment from 'moment';

@Component({
    selector: 'app-home-news',
    templateUrl: './home-news.component.html',
    styleUrls: [
        './home-news.component.scss'
    ],
    providers: [
    ]
})

export class HomeNewsComponent implements OnInit {

    public newsUploadsPath: string = `/${NEWS_UPLOADS_PATH}`;

    public sharesUploadsPath: string = `/${SHARES_UPLOADS_PATH}`;

    public currentSlide: number = 0;

    public slideWidth: number;

    public mainSnippets: any[];

    public activeSnippets = 'all';

    @Input() public newsSnippets: INewsSnippet[];
    @Input() public shareSnippets: Share[];
    @Input() public allSnippets: any[];

    constructor() {
        moment.locale('ru');
    }

    public ngOnInit() {
        this.mainSnippets = this.allSnippets;

        if (document.documentElement.clientWidth < 370 || window.innerWidth < 370) {
            this.slideWidth = document.documentElement.clientWidth - 15 || window.innerWidth - 15;
        } else if (document.documentElement.clientWidth < 767 || window.innerWidth < 767) {
            this.slideWidth = 340 + 15;
        } else {
            this.slideWidth = 340 + 30;
        }
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mainSnippets.length - 1 ) ? this.currentSlide + 1 : this.mainSnippets.length - 1;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : 0 ;
    }

    public changeSnippets(snippets, activeSnippets) {
        this.mainSnippets = snippets;
        this.activeSnippets = activeSnippets;
        this.currentSlide = 0;

    }

    public parseDate(createdAt) {
        return moment(createdAt).format('LL').slice(0, -3);
    }
}
