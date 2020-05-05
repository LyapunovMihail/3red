import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { INewsSnippet } from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import * as moment from 'moment';
import { HomePreviewService } from './home-preview.service';
import { IHomePreviewSnippet } from '../../../../serv-files/serv-modules/home/preview-api/home-preview.interfaces';

@Component({
    selector: 'app-home-preview',
    templateUrl: './home-preview.component.html',
    styleUrls: [
        './home-preview.component.scss'
    ],
    providers: [
        HomePreviewService
    ]
})

export class HomePreviewComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input()
    newsSnippet: INewsSnippet;
    @Input()
    isAuthorizated: boolean;

    // @Input()
    // shareSnippets: Share[];
    // @Input()
    // allSnippets: any[];
    public snippet: IHomePreviewSnippet;
    public windowScrollEvent;
    public scrollTop;
    public closeModal = true;

    constructor(
        private windowEventsService: WindowEventsService,
        private homePreviewService: HomePreviewService
    ) {}

    public ngOnInit() {
        moment.locale('ru');
        this.homePreviewService.getSnippet()
            .subscribe(
                (data) => { this.snippet = data; console.log('this.snippet: ', this.snippet); },
                (err) => console.error(err)
            );
    }

    ngAfterViewInit() {
        this.windowScrollEvent = this.windowEventsService.onScroll.subscribe(() => {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        });
    }

    ngOnDestroy() {
        this.windowScrollEvent.unsubscribe();
    }

    public parseDate(createdAt) {
        return moment(createdAt).format('LL').slice(0, -3);
    }
}
