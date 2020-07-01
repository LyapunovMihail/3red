import { Share, SHARES_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharesService } from '../shares.service';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';

@Component({
    selector: 'app-shares-list',
    templateUrl: './shares-list.component.html',
    styleUrls: ['./shares-list.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})
export class SharesListComponent implements OnInit, OnDestroy {

    public shares: Share[];
    public allSnippets: Share[];

    public uploadsPath = `/${SHARES_UPLOADS_PATH}`;
    public navList = [
        { name: 'Все', link: '/news-shares/all' },
        { name: 'Новости', link: '/news-shares/news' },
        { name: 'Акции', link: '/news-shares/shares' }
    ];

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        private sharesService: SharesService
    ) {
    }

    public ngOnInit() {
        this.getShares();
    }

    public ngOnDestroy() {
        this.unsubscribe();
    }

    public getShares() {
        this.sharesService.getShares().subscribe((data: Share[]) => {
            this.shares = data;
            this.allSnippets = this.shares;
            this.subscribeAuth();
        }, (err) => {
            console.log(err);
        });
    }

    subscribeAuth() {
        this.shares = this.allSnippets.filter((item) => item.publish);
    }

    public unsubscribe() {
    }

    public snippetsChange() {
        this.getShares();
    }
}
