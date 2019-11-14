import { ActivatedRoute } from '@angular/router';
import { IAddressItemFlat } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { Share, SHARES_UPLOADS_PATH, ShareFlatDiscountType, ShareFlat } from '../../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
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

    public share: Share;

    public uploadsPath = `/${SHARES_UPLOADS_PATH}`;

    public indexNum: number;

    public sharesList: Share[];

    public prevId = '';
    public nextId = '';

    public showApartmentWindow = false;
    public selectedFlatIndex: number;

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        private sharesService: SharesService,
        private activatedRoute: ActivatedRoute
    ) {
    }

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
        this.share = this.sharesList.find((share) => share._id === id);
        this.refreshShareFlats();
        this.checkPrevAndNext(id);
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

    public getDiscount(flat): number {
        if (flat.discountType === ShareFlatDiscountType.PERCENT) {
            const discount = flat.price * (flat.discountValue / 100);
            return +discount.toFixed(2);
        }
        return flat.discountValue;
    }

    refreshShareFlats() {
        const flatsData: {houses: number[], numbers: number[]} = {houses: [], numbers: []};
        flatsData.houses = this.share.shareFlats.map((flat) => flat.house);
        flatsData.numbers = this.share.shareFlats.map((flat) => flat.flat);

        this.sharesService.getFlatsByHousesAndNumbers(flatsData)
            .subscribe((refreshFlats: IAddressItemFlat[]) => {
                    this.share.shareFlats.forEach((flat: ShareFlat) => {
                        this.updateFlat(flat, refreshFlats);
                    });
                },
                (err) => console.error(err)
            );
    }

    updateFlat(shareFlat: ShareFlat, refreshFlats: IAddressItemFlat[]) {
        const refreshFlat: IAddressItemFlat = refreshFlats.find((freshFlat) => shareFlat.house === freshFlat.house && shareFlat.flat === freshFlat.flat);
        if (refreshFlat == null) {
            return;
        }

        shareFlat = {discountValue: shareFlat.discountValue, discountType: shareFlat.discountType, ...refreshFlat};
    }

    public openApartmentModal(index) {
        this.selectedFlatIndex = index;
        this.windowScrollLocker.block();
        this.showApartmentWindow = true;
    }
}
