import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { NewsService } from '../news.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-news-view',
    templateUrl: './news-view.component.html',
    styleUrls: ['./news-view.component.scss', './../news.component.scss']
})

export class NewsViewComponent implements OnInit {

    public category = '';

    public createdAt = '';

    public title = '';

    public description = '';

    public image = '';

    public newsList: INewsSnippet[];

    public prevId = '';
    public nextId = '';

    constructor(
        private activatedRoute: ActivatedRoute,
        private newsService: NewsService,
        private router: Router
    ) { }

    public ngOnInit() {
        const id = this.activatedRoute.snapshot.params.id;
        this.getSnippets(id);
    }

    public changeIdSubscribe() {
        this.activatedRoute.params.subscribe((params) => {
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
                    this.category = data[0].category;
                    this.createdAt = data[0].created_at;
                    this.title = data[0].title;
                    this.description = data[0].description;
                    this.image = `/${NEWS_UPLOADS_PATH}${data[0].image}`;
                    this.checkPrevAndNext(id);
                } else {
                    this.router.navigate(['/error-404'], { skipLocationChange: true });
                }
            },
            (err) => {
                this.router.navigate(['/error-404'], { skipLocationChange: true });
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
}
