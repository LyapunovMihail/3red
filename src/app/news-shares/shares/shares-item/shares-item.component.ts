import { ActivatedRoute, Router } from '@angular/router';
import { Share, SHARES_UPLOADS_PATH, ShareFlatDiscountType, ShareFlat } from '../../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import { SharesService } from '../shares.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import * as moment from 'moment';
import { WindowScrollLocker } from '../../../commons/window-scroll-block';
import { Location } from '@angular/common';
import { Meta } from '@angular/platform-browser';

@Component({
    selector: 'app-shares-item',
    templateUrl: './shares-item.component.html',
    styleUrls: ['./shares-item.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})
export class SharesItemComponent implements OnInit, OnDestroy {

    public sharesList: Share[];
    public shareFlats: ShareFlat[];

    public snippet: Share;

    public uploadsPath = `/${SHARES_UPLOADS_PATH}`;

    public prevId = '';
    public nextId = '';

    public id: string;

    public routerEvent;

    public showApartmentWindow = false;
    public selectedFlatIndex: number;

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        private router: Router,
        private sharesService: SharesService,
        private activatedRoute: ActivatedRoute,
        public location: Location,
        public meta: Meta
    ) {}

    public ngOnInit() {
        moment.locale('ru');
        this.id = this.activatedRoute.snapshot.params.id;
        this.getSnippets(this.id);
    }

    public changeIdSubscribe() {
        this.routerEvent = this.activatedRoute.params.subscribe((params) => {
            const newId = params.id;
            this.getSnippet(newId);
        });
    }

    public getSnippets(id) {
        this.sharesService.getShares().subscribe(
            (data) => {
                this.sharesList = data;
                this.getSnippet(id);
                this.changeIdSubscribe();
            },
            (err) => console.error(err)
        );
    }

    public getSnippet(id) {
        this.sharesService.getShareById(id)
            .subscribe((share: Share[]) => {
                if ( share.length === 1 ) {
                    this.snippet = share[0];
                    this.setShareFlats();
                    this.checkPrevAndNext(id);
                    this.setMetaTags();
                } else {
                    this.router.navigate(['/error-404'], { skipLocationChange: true });
                }
            }, (err) => {
                this.router.navigate(['/error-404'], { skipLocationChange: true });
                console.error(err);
            });
    }

    private setShareFlats() {
        this.shareFlats = this.snippet.body.map((item) => {
            if (item.blockType === 'flats') {
                return item.blockFlat;
            }
        });
        console.log('this.shareFlats: ', this.shareFlats);
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
            const discount = +flat.price * (+flat.discount / 100);
            return +discount.toFixed(2);
        }
        return +flat.discount;
    }

    public parseCreatedAtDate(date) {
        return moment(date).format('LL').slice(0, -3);
    }

    public clickShare(item) {
        console.log('item: ', item);
        this.sharesService.updateShareCount(this.id, this.snippet, item)
            .subscribe(
                (data) => this.snippet = data[0],
                (err) => console.error(err)
            );

        if (item === 'vk') {
            let url  = 'http://vkontakte.ru/share.php?';
            url += 'url='          + encodeURIComponent(window.location.href);
            url += '&title='       + encodeURIComponent(this.snippet.name);
            url += '&description=' + encodeURIComponent(this.snippet.text);
            url += '&image='       + encodeURIComponent(this.snippet.mainImage);
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
            url += '&title='       + encodeURIComponent(this.snippet.name);
            url += '&description=' + encodeURIComponent(this.snippet.text);
            url += '&imageUrl='       + encodeURIComponent(this.snippet.mainImage);
            window.open(url,'','toolbar=0,status=0,width=626,height=436');
        }
    }

    private setMetaTags() {
        this.meta.updateTag({property : 'og:type', content: 'website'});
        this.meta.updateTag({property : 'og:title', content: this.snippet.name});
        this.meta.updateTag({property : 'og:description', content: this.snippet.text});
        this.meta.updateTag({property : 'og:image', content: this.snippet.mainImage});
    }

    public openApartmentModal(index) {
        this.selectedFlatIndex = index;
        this.windowScrollLocker.block();
        this.showApartmentWindow = true;
    }

    public ngOnDestroy() {
        if (this.routerEvent) {
            this.routerEvent.unsubscribe();
        }
    }
}
