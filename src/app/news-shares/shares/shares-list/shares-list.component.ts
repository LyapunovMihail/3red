import { SHARES_CREATE_ID, Share, SHARES_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Subject, Subscription } from 'rxjs';
import { AuthorizationObserverService } from '../../../authorization/authorization.observer.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharesService } from '../shares.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PlatformDetectService } from '../../../platform-detect.service';
import { SharesObserverService } from '../shares-observer.service';
import { takeUntil } from 'rxjs/operators';
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

    public isAuth: boolean;

    public redactId: string;

    public shares: Share[];

    public paginator = [];

    public activePaginatorItem: number;

    public paginatorCreated: boolean = false;

    public indexNum: number;

    public sharesLength: number;

    public uploadsPath: string = `/${SHARES_UPLOADS_PATH}`;

    private subs: Subscription[] = [];
    private _ngUnsubscribe: Subject<any> = new Subject();

    public isCreateRedactForm: boolean = false ;

    public isDeleteForm: boolean = false ;

    constructor(
        private authorization: AuthorizationObserverService,
        public windowScrollLocker: WindowScrollLocker,
        private sharesService: SharesService,
        private router: Router,
        private platform: PlatformDetectService,
        private sharesObserverService: SharesObserverService,
        private activatedRoute: ActivatedRoute
    ) {
        this.isAuth = false;
        this.indexNum = Number(this.activatedRoute.snapshot.params.index);
    }

    public ngOnInit() {

        this.subs.push(this.activatedRoute.params
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((params: Params) => {
                this.indexNum = params['index'];
            })
        );
        this.subs.push(this.authorization.getAuthorization()
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((state: boolean) => {
                this.isAuth = state;
            })
        );
        this.getShares((this.indexNum === 1) ? 0 : Number(this.indexNum - 1 + '0'));
        this.activePaginatorItem = this.indexNum - 1;
    }

    public ngOnDestroy() {
        this.unsubscribe();
        this.sharesObserverService.changePageCount(this.indexNum);
    }

    public getShares(skip) {
        this.sharesService.getShares(10, Number(skip)).subscribe((data: {length: number, sharesList: Share[]}) => {
            this.shares = data.sharesList;
            this.sharesLength = data.length;
            this.createPaginator(data.length);
        }, (err) => {
            console.log(err);
        });
    }

    public createPaginator(count) {
        if (!this.paginatorCreated) {
            for (let i: number = 0; i < count; i = i + 10) {
                this.paginator.push(i);
            }
            this.paginatorCreated = true;
        }
    }

    public changeRoute(index) {
        this.activePaginatorItem = index;
        this.router.navigate([`/shares/list/${index + 1}`]);
    }

    public scrollTop() {
        if ( this.platform.isBrowser ) {
            window.scrollTo(0, 0);
        }
    }

    public unsubscribe() {
        this._ngUnsubscribe.next();
        this.subs.forEach((sub: Subscription) => {
            sub.unsubscribe();
        });
    }

    public createSharesSnippet() {
        if ( this.isAuth ) {
            this.redactId = SHARES_CREATE_ID;
            this.isCreateRedactForm = true;
            this.windowScrollLocker.block();
        }
    }

    public redactSharesSnippet(id) {
        if ( this.isAuth ) {
            this.redactId = id;
            this.isCreateRedactForm = true;
            this.windowScrollLocker.block();
        }
    }

    public deleteSharesSnippet(id) {
        if ( this.isAuth ) {
            this.redactId = id;
            this.isDeleteForm = true ;
            this.windowScrollLocker.block();
        }
    }

    public snippetsChange() {
        this.getShares(
            (Number(this.indexNum) === 1)
                ? 0
                : Number(Number(this.indexNum) - 1 + '0')
        );
    }
}
