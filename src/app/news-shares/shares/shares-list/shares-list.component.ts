import { SHARES_CREATE_ID, Share, SHARES_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { AuthorizationObserverService } from '../../../authorization/authorization.observer.service';
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

    public isAuthorizated: boolean;

    public shares: Share[];
    public allSnippets: Share[];

    public uploadsPath: string = `/${SHARES_UPLOADS_PATH}`;

    // подписка на авторизацию
    public AuthorizationEvent;

    public redactId: string;
    public isCreateRedactForm: boolean = false;
    public isDeleteForm: boolean = false;

    public navList = [
        { name: 'Все', link: '/news-shares/all' },
        { name: 'Новости', link: '/news-shares/news' },
        { name: 'Акции', link: '/news-shares/shares' }
    ];

    constructor(
        private authorization: AuthorizationObserverService,
        public windowScrollLocker: WindowScrollLocker,
        private sharesService: SharesService
    ) {
        this.isAuthorizated = false;
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
        this.AuthorizationEvent = this.authorization.getAuthorization()
            .subscribe((state: boolean) => {
                this.isAuthorizated = state;
                if (this.isAuthorizated) {
                    this.shares = this.allSnippets;
                } else {
                    this.shares = this.allSnippets.filter((item) => item.publish);
                }
            });
    }

    public unsubscribe() {
        this.AuthorizationEvent.unsubscribe();
    }

    public createSnippet() {
        if ( this.isAuthorizated ) {
            this.redactId = SHARES_CREATE_ID;
            this.isCreateRedactForm = true;
            this.windowScrollLocker.block();
        }
    }

    public redactSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isCreateRedactForm = true;
            this.windowScrollLocker.block();
        }
    }

    public deleteSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.isDeleteForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public updateSnippet(snippet) {
        this.sharesService.updateShare(snippet._id, snippet)
            .subscribe(
                () => console.log('success'),
                (err) => console.error(err)
            );
    }

    public snippetsChange() {
        this.getShares();
    }
}
