import { NewsService } from '../news.service';
import { INewsSnippet } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

@Component({
    selector: 'app-news-preview',
    templateUrl: './news-preview.component.html',
    styleUrls: ['./news-preview.component.scss', './../news.component.scss']
})

export class NewsPreviewComponent implements OnInit {

    snippetsArray: INewsSnippet[] = [];

    constructor(
        private newsService: NewsService,
        private ref: ChangeDetectorRef
    ) {}

    ngOnInit() {
        this.newsService.getSnippet().subscribe(
            (data) => {
                this.snippetsArray = data;
                this.ref.detectChanges();
            },
            (err) => console.error(err)
        );
    }
}
