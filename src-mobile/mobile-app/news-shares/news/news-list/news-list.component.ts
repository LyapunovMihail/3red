import { NewsService } from '../news.service';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';
import { INewsSnippet, NEWS_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-news-list',
    templateUrl: './news-list.component.html',
    styleUrls: ['./news-list.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})

export class NewsListComponent implements OnInit {

    public uploadsPath = `/${NEWS_UPLOADS_PATH}`;

    public snippetsArray: INewsSnippet[] = [];
    public allSnippets: INewsSnippet[] = [];
    public navList = [
        { name: 'Все', link: '/news-shares/all' },
        { name: 'Новости', link: '/news-shares/news' },
        { name: 'Акции', link: '/news-shares/shares' }
    ];

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        private newsService: NewsService
    ) { }

    public ngOnInit(): void {
        this.getSnippets();
    }

    public filterPublish() {
        this.snippetsArray = this.allSnippets.filter((item) => item.publish);
    }

    public getSnippets() {
        this.newsService.getSnippet().subscribe(
            (data) => {
                this.snippetsArray = data;
                this.allSnippets = data;
                this.filterPublish();
            },
            (err) => console.error(err)
        );
    }

    // вызывается после создания, удаления, редактирования
    public snippetsChange(data: INewsSnippet[]) {
        this.snippetsArray = data;
    }

}
