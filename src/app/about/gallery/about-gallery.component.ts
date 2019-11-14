import { Component, OnDestroy, OnInit } from '@angular/core';
import {
    EnumGallerySnippet,
    GALLERY_UPLOADS_PATH,
    IGallerySnippet
} from '../../../../serv-files/serv-modules/gallery-api/gallery.interfaces';
import { PlatformDetectService } from '../../platform-detect.service';
import { AboutGalleryService } from './about-gallery.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';

@Component({
    selector: 'app-about-gallery',
    templateUrl: './about-gallery.component.html',
    styleUrls: ['./about-gallery.component.scss', '../about.component.scss'],
    providers: [
        PlatformDetectService,
        WindowScrollLocker,
        AboutGalleryService
    ]
})

export class AboutGalleryComponent implements OnInit, OnDestroy {

    public isShowModalAdmin = false;

    public uploadsPath = `/${GALLERY_UPLOADS_PATH}`;

    public activeSnippets = EnumGallerySnippet.ARCHITECTURE;

    public architectureSnippets: IGallerySnippet[];
    public landscapingSnippets: IGallerySnippet[];
    public parkingSnippets: IGallerySnippet[];
    public mainSnippets: IGallerySnippet[];

    public currentSlide = 0;

    public isAuthorizated = false ;
    public AuthorizationEvent;

    public slideShowTimer;

    constructor(
        public platform: PlatformDetectService,
        private authorization: AuthorizationObserverService,
        public windowScrollLocker: WindowScrollLocker,
        private aboutGalleryService: AboutGalleryService
    ) {
    }

    public ngOnInit() {

        if ( !this.platform.isBrowser ) { return false; }

        this.AuthorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });

        this.aboutGalleryService.getGallerySnippet(EnumGallerySnippet.ARCHITECTURE).subscribe(
            (data: IGallerySnippet[]) => {
                this.mainSnippets = data;
                this.architectureSnippets = data;
            },
            (err) => console.log(err)
        );
        this.aboutGalleryService.getGallerySnippet(EnumGallerySnippet.LANDSCAPING).subscribe(
            (data: IGallerySnippet[]) => {
                this.landscapingSnippets = data;
            },
            (err) => console.log(err)
        );
        this.aboutGalleryService.getGallerySnippet(EnumGallerySnippet.PARKING).subscribe(
            (data: IGallerySnippet[]) => {
                this.parkingSnippets = data;
            },
            (err) => console.log(err)
        );

        this.slideShow();
    }

    public ngOnDestroy() {
        if (!this.platform.isBrowser) { return false; }
        this.AuthorizationEvent.unsubscribe();
        this.clearInt();
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mainSnippets.length - 1 ) ? this.currentSlide + 1 : 0 ;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.mainSnippets.length - 1 ;
    }

    public toggleSnippets(snippets, activeSnippets) {
        this.mainSnippets = snippets;
        this.activeSnippets = activeSnippets;
        this.currentSlide = 0;
    }

    public adminGalleryChange(newSlides) {
        this.mainSnippets = newSlides;

        if (this.activeSnippets === EnumGallerySnippet.ARCHITECTURE) {
            this.architectureSnippets = newSlides;
        } else if (this.activeSnippets === EnumGallerySnippet.LANDSCAPING) {
            this.landscapingSnippets = newSlides;
        } else if (this.activeSnippets === EnumGallerySnippet.PARKING) {
            this.parkingSnippets = newSlides;
        }
    }

    public slideShow() {
        this.slideShowTimer = setInterval(() => {
            this.currentSlide = (this.currentSlide < this.mainSnippets.length - 1 ) ?
                this.currentSlide + 1 : 0;
        }, 3000);
    }

    public clearInt() {
        if (!this.platform.isBrowser) { return false; }
        clearInterval(this.slideShowTimer);
    }

    public changeDescription(id, description) {
        this.aboutGalleryService.changeDescription(id, description).subscribe(
            (data: IGallerySnippet[]) => this.adminGalleryChange(data),
            (err) => console.log(err)
        );
    }

    public changeName(id, name) {
        this.aboutGalleryService.changeName(id, name).subscribe(
            (data: IGallerySnippet[]) => this.adminGalleryChange(data),
            (err) => console.log(err)
        );
    }
}
