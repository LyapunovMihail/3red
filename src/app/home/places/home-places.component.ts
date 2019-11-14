import { Component, OnInit } from '@angular/core';
import { EnumGallerySnippet, GALLERY_UPLOADS_PATH, IGallerySnippet } from '../../../../serv-files/serv-modules/gallery-api/gallery.interfaces';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
import { HomeService } from '../home.service';
import { PlatformDetectService } from '../../platform-detect.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

@Component({
    selector: 'app-home-places',
    templateUrl: './home-places.component.html',
    styleUrls: ['./home-places.component.scss'],
    providers: [
        PlatformDetectService,
        WindowScrollLocker
    ]
})

export class HomePlacesComponent implements OnInit {

    public uploadsPath: string = `/${GALLERY_UPLOADS_PATH}`;

    public isAuthorizated: boolean = false ;

    public AuthorizationEvent;

    public currentSlide: number = 0;

    public isShowModalAdmin: boolean = false;

    public gallerySlides: IGallerySnippet[];

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

        this.homeService.getGallerySnippet(EnumGallerySnippet.PLACES).subscribe(
            (data: IGallerySnippet[]) => {
                this.gallerySlides = data;
            },
            (err) => console.log(err)
        );
    }

    ngOnDestroy() {
        if (!this.platform.isBrowser) { return false; }
        this.AuthorizationEvent.unsubscribe();
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
}
