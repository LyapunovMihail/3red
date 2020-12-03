import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { NewsService } from './../news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as moment from 'moment';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-news-view',
    templateUrl: './news-view.component.html',
    styleUrls: ['./news-view.component.scss'],
    providers: [NewsService]
})

export class NewsViewComponent implements OnInit, OnDestroy {

    public newsList: INewsSnippet[];
    public snippet: INewsSnippet;
    public uploadsPath = `/${NEWS_UPLOADS_PATH}`;

    public prevId = '';
    public nextId = '';

    public routerEvent;

    public id;

    constructor(
        private activatedRoute: ActivatedRoute,
        private newsService: NewsService,
        private router: Router,
        public location: Location,
        public http: HttpClient,
        public meta: Meta
    ) { }

    public ngOnInit() {
        moment.locale('ru');
        this.id = this.activatedRoute.snapshot.params.id;
        this.getSnippets(this.id);
    }

    // ngAfterViewInit() {
    //     // document.body.insertAdjacentHTML('beforeend', `<script src="https://vk.com/share.php?act=count&index=${this.id}&url=${window.location.href}"></script>`);
    //     // this.newsService.getCount(this.id)
    //     //     .subscribe(
    //     //         (data) => console.log('data: ', data),
    //     //         (err) => console.error(err)
    //     //     );
    // }

    public changeIdSubscribe() {
        this.routerEvent = this.activatedRoute.params.subscribe((params) => {
            const newId = params.id;
            this.getSnippet(newId);
        });
    }

    public getSnippets(id) {
        this.newsService.getSnippet().subscribe(
            (data) => {
                this.newsList = data;
                this.getSnippet(id);
                this.changeIdSubscribe();
            },
            (err) => console.error(err)
        );
    }

    public getSnippet(id) {
        this.newsService.getSnippetById(id).subscribe(
            (data) => {
                if ( data.length === 1 ) {
                    this.snippet = data[0];
                    this.checkPrevAndNext(id);
                    this.setMetaTags();
                } else {
                    this.router.navigate(['/error-404'], { skipLocationChange: true });
                }
            },
            (err) => {
               // this.router.navigate(['/error-404'], { skipLocationChange: true });
                console.error(err);
            }
        );
    }

    public checkPrevAndNext(id) {
        this.newsList.forEach((item, i, data) => {
            if (item._id === id) {
                this.prevId = i !== 0 ? data[i - 1]._id : '';
                this.nextId = i !== data.length - 1 ? data[i + 1]._id : '';
            }
        });
    }

    public parseCreatedAtDate(date) {
        return moment(date).format('LL').slice(0, -3);
    }

    public clickShare(item) {
        this.newsService.updateShareCount(this.id, this.snippet, item)
            .subscribe(
                (data) => this.snippet = data[0],
                (err) => console.error(err)
            );

        if (item === 'vk') {
            let url  = 'http://vkontakte.ru/share.php?';
            url += 'url='          + encodeURIComponent(window.location.href);
            url += '&title='       + encodeURIComponent(this.snippet.title);
            url += '&description=' + encodeURIComponent(this.snippet.description);
            url += '&image='       + encodeURIComponent(window.location.origin + this.uploadsPath + this.snippet.image);
            url += '&noparse=true';

            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        } else if (item === 'fb') {
            let url  = 'http://www.facebook.com/sharer.php?';
            url += 'u='       + encodeURIComponent(window.location.href);
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        } else if (item === 'ok') {
            let url  = 'https://connect.ok.ru/offer?';
            // url += '&st.comments=' + encodeURIComponent('Text');
            url += 'url='    + encodeURIComponent(window.location.href);
            url += '&title='       + encodeURIComponent(this.snippet.title);
            url += '&description=' + encodeURIComponent(this.snippet.description);
            url += '&imageUrl='       + encodeURIComponent(window.location.origin + this.uploadsPath + this.snippet.image);
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        }
    }

    private setMetaTags() {
        this.meta.updateTag({property : 'og:type', content: 'website'});
        this.meta.updateTag({property : 'og:title', content: this.snippet.title});
        this.meta.updateTag({property : 'og:description', content: this.snippet.description});
        this.meta.updateTag({property : 'og:image', content: window.location.origin + this.uploadsPath + this.snippet.image});
    }

    // private removeMetaTags() {
    //     // this.meta.removeTag('og:type');
    //     // this.meta.removeTag('og:title');
    //     // this.meta.removeTag('og:description');
    //     // this.meta.removeTag('og:image');
    // }

    public ngOnDestroy() {
        // this.removeMetaTags();
        this.routerEvent.unsubscribe();
    }
}
