import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { mockSlider } from './mockSlide';
import { ObjectGalleryAdminService } from './object-gallery-content-admin/object-gallery-admin.service';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IObjectGallerySnippet, OBJECTS_GALLERY_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/gallery-api/objects-gallery.interfaces';

@Component({
    selector: 'app-object-item-gallery',
    templateUrl: 'object-gallery.component.html',
    styleUrls: [
        'object-gallery.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectGalleryAdminService]
})

export class ObjectGalleryComponent implements OnInit, OnDestroy {

    @Input()
    public isAuthorizated = false;
    @Input()
    public objectId: string;

    public slideList = mockSlider;

    public currentSlide: number = 0;
    public currentTab: string;

    public interval;

    public contentSnippet: IObjectGallerySnippet;
    public tabSnippet: IObjectTabsSnippet;
    public switchOn = false;

    public closeTabsModal = true;
    public closeContentModal = true;

    public uploadsPath = `/${OBJECTS_GALLERY_UPLOADS_PATH}`;

    constructor(
        private galleryService: ObjectGalleryAdminService,
    ) { }

    ngOnInit() {
        this.getTabsThanContent();
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
            if (this.tabSnippet.gallery.length && this.tabSnippet.gallery.some((tab) => tab.show)) {
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
            } else {
                this.clearInt();
            }
            console.log('this.contentSnippet: ', this.contentSnippet);
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
        clearInterval(this.interval);
    }

    ngOnDestroy() {
        this.clearInt();
    }

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.contentSnippet, objectId: this.objectId, switchOn: this.switchOn};
        this.galleryService.setContentSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }
}
