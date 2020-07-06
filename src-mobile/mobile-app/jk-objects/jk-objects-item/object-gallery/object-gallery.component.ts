import { Component, Input, OnDestroy, OnInit, AfterViewInit } from '@angular/core';
import { ObjectGalleryAdminService } from './object-gallery-admin.service';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IObjectGallerySnippet, OBJECTS_GALLERY_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/gallery-api/objects-gallery.interfaces';
declare const Swiper: any;

@Component({
    selector: 'app-object-item-gallery',
    templateUrl: 'object-gallery.component.html',
    styleUrls: [
        'object-gallery.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectGalleryAdminService]
})

export class ObjectGalleryComponent implements OnInit, OnDestroy, AfterViewInit {

    @Input()
    public objectId: string;

    public currentSlide = 0;
    public currentTab: string;

    public interval;
    public showTimeline = true;

    public contentSnippet: IObjectGallerySnippet;
    public tabSnippet: IObjectTabsSnippet;
    public switchOn = false;

    public uploadsPath = `/${OBJECTS_GALLERY_UPLOADS_PATH}`;

    public swiperSlider;
    public sliderTimeline = false;

    constructor(
        private galleryService: ObjectGalleryAdminService,
    ) { }

    ngOnInit() {
        this.getTabsThanContent();

        // this.slideShow();
    }
    ngAfterViewInit() {
        // setTimeout(() => {
        //     this.swiperInit();
        // }, 1000);
    }

    public getTabsThanContent() {
        this.galleryService.getTabsSnippetById(this.objectId).subscribe((data) => {
            this.refreshTabs(data);
        }, (error) => {
            console.error(error);
        });
    }

    public refreshTabs(data) {
        this.tabSnippet = data;
        if (this.tabSnippet) {
            if (this.tabSnippet.gallery && this.tabSnippet.gallery.length && this.tabSnippet.gallery.some((tab) => tab.show)) {
                this.currentTab = this.tabSnippet.gallery.find((tab) => tab.show).name;
            } else {
                this.currentTab = 'no-tab';
            }
        } else {
            this.currentTab = 'no-tab';
        }
        this.getContent();
    }

    public getContent() {
        this.galleryService.getContentSnippetByIdAndTab(this.objectId, this.currentTab).subscribe((data) => {
            this.contentSnippet = data;
            if (this.contentSnippet) {
                this.switchOn = this.contentSnippet.switchOn;
                if (!this.swiperSlider) { // Если слайдер не запущен запускаем
                    setTimeout(() => this.swiperInit(), 1000);
                } else { // Если запущен то обновляем его
                    setTimeout(() => this.swiperSlider.update(), 100);
                }
            } else {
                this.clearInt();
            }
        }, (error) => {
            console.error(error);
        });
    }

    public changeTab(tab) {
        this.currentTab = tab;
        this.getContent();
    }

    public nextSlide() {
        this.currentSlide = (this.currentSlide < this.contentSnippet.image_data.length - 1 ) ? this.currentSlide + 1 : 0;
    }

    public prevSlide() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.contentSnippet.image_data.length - 1;
    }

    public slideShow() {
        this.interval = setInterval(() => {
            this.currentSlide < this.contentSnippet.image_data.length - 1
                ? this.nextSlide()
                : this.currentSlide = 0;
        }, 5000);
    }

    public clearInt() {
        this.showTimeline = false;
        clearInterval(this.interval);
    }

    ngOnDestroy() {
        this.clearInt();
    }

    swiperInit() {

        if (this.swiperSlider) { return; }

        this.swiperSlider = new Swiper('.swiper-gallery', {
            speed: 1000,
            navigation: {
              nextEl: '.swiper-gallery__btn--next',
              prevEl: '.swiper-gallery__btn--prev',
              disabledClass: 'disabled'
            },
            autoplay: {
                delay: 5000,
                waitForTransition: true,
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'bullets',
                bulletActiveClass: 'active',
                renderBullet: function (index, className) {
                    return `<span class="${className} ${className}--dot-${index}"></span>`;
                }
            },
            on: {
                autoplayStart: () => this.sliderTimeline = true,
                autoplayStop: () => this.sliderTimeline = false,
            }
        });
    }
}
