import { AfterViewInit, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { WindowEventsService } from '../../commons/window-events.observer.service';
import * as moment from 'moment';
import { HomePreviewService } from './home-preview.service';
import { IHomePreviewSnippet } from '../../../../serv-files/serv-modules/home/preview-api/home-preview.interfaces';
import { PlatformDetectService } from '../../platform-detect.service';

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
    newsSnippet;
    @Input()
    isAuthorizated: boolean;

    public snippet: IHomePreviewSnippet;
    public windowScrollEvent;
    public scrollTop;
    public closeModal = true;

    public newsInterval;
    public currentNews = 0;

    constructor(
        public platform: PlatformDetectService,
        private windowEventsService: WindowEventsService,
        private homePreviewService: HomePreviewService
    ) {}

    public ngOnInit() {
        moment.locale('ru');
        this.homePreviewService.getSnippet()
            .subscribe(
                (data) => this.snippet = data,
                (err) => console.error(err)
            );
        this.changesNews();
    }

    ngAfterViewInit() {
        if ( !this.platform.isBrowser ) { return false; }

        this.windowScrollEvent = this.windowEventsService.onScroll.subscribe(() => {
            this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        });
    }

    ngOnDestroy() {
        if ( !this.platform.isBrowser ) { return false; }

        this.windowScrollEvent.unsubscribe();
        if (this.newsInterval) {
            clearInterval(this.newsInterval);
        }
    }

    public changesNews() {
        const total = this.newsSnippet.length - 1;
        if (total > 0) {
            this.newsInterval = setInterval( () => {
                this.currentNews = this.currentNews < total ? this.currentNews + 1 : 0;
            }, 5000);
        }
    }

    public parseDate(createdAt) {
        return moment(createdAt).format('LL').slice(0, -3);
    }
}
