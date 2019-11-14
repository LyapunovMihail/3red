import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { EnumGallerySnippet, GALLERY_UPLOADS_PATH, IGallerySnippet } from '../../../../serv-files/serv-modules/gallery-api/gallery.interfaces';
import { HomeService } from '../home.service';
import { PlatformDetectService } from '../../platform-detect.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';
import set = Reflect.set;

@Component({
    selector: 'app-home-places',
    templateUrl: './home-places.component.html',
    styleUrls: ['./home-places.component.scss'],
    providers: [
        PlatformDetectService,
        WindowScrollLocker
    ]
})

export class HomePlacesComponent implements OnInit, AfterViewInit {

    public uploadsPath: string = `/${GALLERY_UPLOADS_PATH}`;

    public gallerySlides: IGallerySnippet[];

    public slide = 1;

    public imgWidth: number;

    public marginRight: number;

    @ViewChild('img')
    public img: ElementRef;

    constructor(
        public platform: PlatformDetectService,
        public windowScrollLocker: WindowScrollLocker,
        public homeService: HomeService
    ) {}

    public ngOnInit() {

        if ( !this.platform.isBrowser ) { return false; }

        this.homeService.getGallerySnippet(EnumGallerySnippet.PLACES).subscribe(
            (data: IGallerySnippet[]) => {
                this.gallerySlides = data;
            },
            (err) => console.log(err)
        );
        console.log(this.gallerySlides);
        
    }

    public ngAfterViewInit() {
        setTimeout(() => {
            this.imgWidth = this.img.nativeElement.clientWidth;
            this.marginRight = Number(getComputedStyle(this.img.nativeElement).marginRight.slice(0, -2));
        }, 300);
    }

    public scroll(event) {
        const scrollLeft = event.target.scrollLeft;
        this.slide = Math.ceil((scrollLeft - (this.imgWidth + this.marginRight) / 2.5) / (this.imgWidth + this.marginRight)) + 1; // рассчитываем кол-во проскроленных слайдов
    }
}
