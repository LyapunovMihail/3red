import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { INewsSnippet } from '../../../../serv-files/serv-modules/news-api/news.interfaces';
import { Share } from '../../../../serv-files/serv-modules/shares-api/shares.interfaces';
import * as moment from 'moment';
import {
    EnumGallerySnippet,
    GALLERY_UPLOADS_PATH,
    IGallerySnippet
} from '../../../../serv-files/serv-modules/gallery-api/gallery.interfaces';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
import { HomeService } from '../home.service';
import { PlatformDetectService } from '../../platform-detect.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';
declare let $: any;

@Component({
    selector: 'app-home-preview',
    templateUrl: './home-preview.component.html',
    styleUrls: [
        './home-preview.component.scss'
    ],
    providers: [
        PlatformDetectService,
        WindowScrollLocker
    ]
})

export class HomePreviewComponent implements OnInit, OnDestroy {

    public uploadsPath: string = `/${GALLERY_UPLOADS_PATH}`;

    public isAuthorizated: boolean = false ;

    public AuthorizationEvent;

    public currentSlide: number = 0;

    public isShowModalAdmin: boolean = false;

    public showTrojka: boolean = false;

    public slideWidth = document.documentElement.clientWidth;

    public gallerySlides: IGallerySnippet[];

    public activeNews= 0;

    public activeShare = 0;

    private newsTimer;

    private sharesTimer;

    @Input() public newsSnippets: INewsSnippet[];
    @Input() public shareSnippets: Share[];

    constructor(
        public platform: PlatformDetectService,
        private authorization: AuthorizationObserverService,
        public windowScrollLocker: WindowScrollLocker,
        public homeService: HomeService
    ) {}

    public ngOnInit() {

        if ( !this.platform.isBrowser ) { return false; }

        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });

        this.prepareMainNewsSnippets();

        this.homeService.getGallerySnippet(EnumGallerySnippet.PREVIEW).subscribe(
            (data: IGallerySnippet[]) => {
                this.gallerySlides = data;
            },
            (err) => console.log(err)
        );
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.gallerySlides.length - 1 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.gallerySlides.length - 1 ;
    }

    public changeDescription(id, description) {
        this.homeService.changeDescription(id, description).subscribe(
            (data: IGallerySnippet[]) => this.gallerySlides = data,
            (err) => console.log(err)
        );
    }

    public changeName(id, name) {
        this.homeService.changeName(id, name).subscribe(
            (data: IGallerySnippet[]) => this.gallerySlides = data,
            (err) => console.log(err)
        );
    }

    prepareMainNewsSnippets() {
        this.newsSnippets.reverse();
        this.newsSnippets = this.newsSnippets.filter((news: INewsSnippet) => {
            return news.show_on_main;
        });

        if (this.newsSnippets) {
            // this.newsSnippets.forEach((news) => {
            //     if (news.title) {
            //         news.title = news.title.length < 53 ? news.title : news.title.slice(0, 50) + '...';
            //     }
            // });
            this.newsSlider(this.newsSnippets);
        }

        this.shareSnippets.reverse();
        this.shareSnippets = this.shareSnippets.filter((share: Share) => {
            if (share.show_on_main) {
                share.finish_date = this.countDown(share.finish_date) + '';
                return true;
            }
        });

        if (this.shareSnippets) {
            // this.shareSnippets.forEach((share) => {
            //     if (share.name) {
            //         share.name = share.name.length < 53 ? share.name : share.name.slice(0, 50) + '...';
            //     }
            // });
            this.sharesSlider(this.shareSnippets);
        }
    }

    public countDown(finishDate) {
        let createdDateVal = moment(Date.now());
        let finishDateVal = moment(finishDate);
        let duration = moment.duration(createdDateVal.diff(finishDateVal));
        return Math.ceil(duration.asDays() * -1);
    }

    public newsSlider(newsList) {
        if ( !this.platform.isBrowser ) { return false; }
        if (newsList.length > 1) {
            this.newsTimer = setInterval(() => {
                this.activeNews = this.activeNews < newsList.length - 1 ? this.activeNews + 1 : 0;
            }, 6000);
        }
    }

    public sharesSlider(sharesList) {
        if ( !this.platform.isBrowser ) { return false; }
        if (sharesList.length > 1) {
            this.sharesTimer = setInterval(() => {
                this.activeShare = this.activeShare < sharesList.length - 1 ? this.activeShare + 1 : 0;
            }, 6000);
        }
    }

    ngOnDestroy() {
        if ( !this.platform.isBrowser ) { return false; }
        this.AuthorizationEvent.unsubscribe();

        if (this.newsTimer) {
            clearInterval(this.newsTimer);
        }
        if (this.sharesTimer) {
            clearInterval(this.sharesTimer);
        }
    }

    @HostListener('document:click', ['$event'])
    public onDocumentClick(event) {
        const trojkaDiv = $('.main__preview-threeRed');
        if (!trojkaDiv.is(event.target) && !trojkaDiv.has(event.target).length) {
            this.showTrojka = false;
        } else {
            this.showTrojka = true;
        }
    }
}
