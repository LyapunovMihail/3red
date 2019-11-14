import { Router, ActivatedRoute, Params } from '@angular/router';
import { SharesService } from '../shares.service';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Share, SHARES_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as moment from 'moment';


@Component({
    selector: 'app-shares-list',
    templateUrl: './shares-list.component.html',
    styleUrls: ['./shares-list.component.scss']
})
export class SharesListComponent implements OnInit, OnDestroy {

   // public shares: Share[];

    public shares;

    public paginator = [];

    public activePaginatorItem: number;

    public paginatorCreated: boolean = false;

    public indexNum: number;

    public sharesLength: number;

    public uploadsPath: string = `/${SHARES_UPLOADS_PATH}`;

    private subs: Subscription[] = [];
    private _ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        private sharesService: SharesService,
        private router: Router,
        private activatedRoute: ActivatedRoute
    ) {
        this.indexNum = Number(this.activatedRoute.snapshot.params.index);
    }

    public ngOnInit() {
        this.subs.push(this.activatedRoute.params
            .pipe(takeUntil(this._ngUnsubscribe))
            .subscribe((params: Params) => {
                this.indexNum = params['index'];
            })
        );
        this.getShares((this.indexNum === 1) ? 0 : Number(this.indexNum - 1 + '0'));
        this.activePaginatorItem = this.indexNum - 1;
    }

    public ngOnDestroy() {
        this.unsubscribe();
    }

    public getShares(skip) {
        this.sharesService.getShares(10, Number(skip)).subscribe((data: {length: number, sharesList: Share[]}) => {
            this.shares = data.sharesList;
            this.sharesLength = data.length;
            this.createPaginator(data.length);
        }, err => {
            console.error(err);
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
        window.scrollTo(0, 0);
    }

    public countDown(finishDate) {
        let createdDateVal = moment(Date.now());
        let finishDateVal = moment(finishDate);
        let duration = moment.duration(createdDateVal.diff(finishDateVal));
        return Math.ceil(duration.asDays() * -1);
    }

    public unsubscribe() {
        this._ngUnsubscribe.next();
        this.subs.forEach((sub: Subscription) => {
            sub.unsubscribe();
        });
    }
}
