import { ActivatedRoute } from '@angular/router';
import { Share, SHARES_UPLOADS_PATH, ShareFlatDiscountType } from '../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { SharesService } from '../../shares.service';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';

@Component({
    selector: 'app-shares-item',
    templateUrl: './shares-item.component.html',
    styleUrls: ['./shares-item.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})
export class SharesItemComponent implements OnInit {

    public isReserveFormOpen = false;
    public isCallFormOpen = false;

    public share: Share;

    public uploadsPath = `/${SHARES_UPLOADS_PATH}`;

    public shareFlatDiscountType = ShareFlatDiscountType;

    public indexNum: number;

    public sharesList: Share[];

    public prevId = '';
    public nextId = '';

    public selectFlat = {
        house: '0',
        number: '0',
        space: '0',
        room: '0',
        price: 0
    };

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        private sharesService: SharesService,
        private activatedRoute: ActivatedRoute
    ) {}

    public ngOnInit() {
        const id = this.activatedRoute.snapshot.params.id;
        this.indexNum = Number(this.activatedRoute.snapshot.params.index);
        this.getSnippets(id);
    }


    public changeIdSubscribe() {
        this.activatedRoute.params.subscribe((params) => {
            const newId = params.id;
            this.indexNum = params.index;
            this.getSnippet(newId);
        });
    }

    public getSnippets(id) {
        this.sharesService.getShares(1000, 0).subscribe(
            (data) => {
                this.sharesList = data.sharesList;
                this.getSnippet(id);
                this.changeIdSubscribe();
            },
            (err) => console.error(err)
        );
    }

    public getSnippet(id) {
        this.sharesService.getShareById(id)
            .subscribe((share: Share[]) => {
                this.share = share[0];
                this.checkPrevAndNext(id);
            }, (err) => {
                console.error(err);
            });
    }

    public checkPrevAndNext(id) {
        this.sharesList.forEach((item, i, data) => {
            if (item._id === id) {
                this.prevId = i !== 0 ? data[i - 1]._id : '';
                this.nextId = i !== data.length - 1 ? data[i + 1]._id : '';
            }
        });
    }

    public countDown(finishDate) {
        const createdDateVal = moment(Date.now());
        const finishDateVal = moment(finishDate);
        const duration = moment.duration(createdDateVal.diff(finishDateVal));
        return Math.ceil(duration.asDays() * -1);
    }

    public setFlatData(flat) {
        this.selectFlat = {
            house: flat.house,
            number: flat.number,
            space: flat.space,
            room: (flat.room === 'Студия') ? '0' : (flat.room === 'Однокомнатная') ? '1' : (flat.room === 'Двухкомнатная') ? '2' : '3',
            price: +flat.price - +flat.discount
        };
    }

    public getDiscount(flat): number {
        if (flat.discountType === ShareFlatDiscountType.PERCENT) {
            const discount = +flat.price * (+flat.discount / 100);
            return +discount.toFixed(2);
        }
        return +flat.discount;
    }
}
