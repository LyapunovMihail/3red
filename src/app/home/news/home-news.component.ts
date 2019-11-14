import {Component, Input, OnInit } from '@angular/core';
import {INewsSnippet, NEWS_UPLOADS_PATH} from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import {Share, SHARES_UPLOADS_PATH} from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
declare let $: any;
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

    public isAuthorizated: boolean = false ;

    public AuthorizationEvent;

    public currentSlide: number = 0;

    public isShowModalAdmin: boolean = false;

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
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mainSnippets.length - 3 ) ? this.currentSlide + 1 : this.mainSnippets.length - 3;
        const snippets = this.activeSnippets === 'all' ? this.allSnippets : this.activeSnippets === 'news' ? this.newsSnippets : this.shareSnippets;
        this.setSlidesOpacity(snippets);
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : 0 ;
        const snippets = this.activeSnippets === 'all' ? this.allSnippets : this.activeSnippets === 'news' ? this.newsSnippets : this.shareSnippets;
        this.setSlidesOpacity(snippets);
    }

    // установка опасити для анимации слайдов
    private setSlidesOpacity(snippets) {
        snippets.forEach((item, index) => {
            if (index < this.currentSlide || index > this.currentSlide + 2) {
                $(`#slider-item-${index}`).css({opacity: 0, ['pointer-events'] : 'none'});
            } else {
                $(`#slider-item-${index}`).css({opacity: 1, ['pointer-events'] : 'unset'});
            }
        });
    }

    public changeSnippets(snippets, activeSnippets) {
        this.mainSnippets = snippets;
        this.activeSnippets = activeSnippets;
        this.currentSlide = 0;

        this.setSlidesOpacity(snippets);
    }

    public parseDate(createdAt) {
        return moment(createdAt).format('LL').slice(0, -3);
    }
}
