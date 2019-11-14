import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {
    EnumGallerySnippet,
    GALLERY_UPLOADS_PATH,
    IGallerySnippet
} from '../../../../serv-files/serv-modules/gallery-api/gallery.interfaces';
import { PlatformDetectService } from '../../platform-detect.service';
import { AboutGalleryService } from './about-gallery.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

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

export class AboutGalleryComponent implements OnInit, AfterViewInit {

    public uploadsPath = `/${GALLERY_UPLOADS_PATH}`;

    public activeSnippets = EnumGallerySnippet.ARCHITECTURE;

    public architectureSnippets: IGallerySnippet[];
    public landscapingSnippets: IGallerySnippet[];
    public parkingSnippets: IGallerySnippet[];
    public mainSnippets: IGallerySnippet[];

    public currentSlide = 0;

    public imgWidth: number;
    public marginRight: number;
    public scrollWidth: number;

    public slideShowTimer;

    @ViewChild('img')
    public img: ElementRef;

    constructor(
        public platform: PlatformDetectService,
        public windowScrollLocker: WindowScrollLocker,
        private aboutGalleryService: AboutGalleryService
    ) {
    }

    public ngOnInit() {

        if ( !this.platform.isBrowser ) { return false; }

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
    }

    public ngAfterViewInit() {
        setTimeout(() => {
            this.imgWidth = this.img.nativeElement.clientWidth;
            this.marginRight = Number(getComputedStyle(this.img.nativeElement).marginRight.slice(0, -2));
            this.scrollWidth = this.imgWidth + this.marginRight;
        }, 300);
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.mainSnippets.length - 1 ) ? this.currentSlide + 1 : this.mainSnippets.length - 1;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : 0 ;
    }

    public toggleSnippets(snippets, activeSnippets) {
        this.mainSnippets = snippets;
        this.activeSnippets = activeSnippets;
        this.currentSlide = 0;
    }
}
