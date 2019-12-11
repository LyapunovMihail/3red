import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { mockSlider } from './mockSlide';
import { ObjectsItemGalleryAdminService } from './object-item-gallery-content-admin/objects-item-gallery-admin.service';
import { ActivatedRoute } from '@angular/router';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import { IObjectGallerySnippet, OBJECTS_GALLERY_UPLOADS_PATH } from '../../../../../serv-files/serv-modules/jk-objects/gallery-api/objects-gallery.interfaces';

@Component({
    selector: 'app-object-item-gallery',
    templateUrl: 'object-item-gallery.component.html',
    styleUrls: [
        'object-item-gallery.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [ObjectsItemGalleryAdminService]
})

export class ObjectItemGalleryComponent implements OnInit, OnDestroy {

    @Input()
    public isAuthorizated = false;

    public slideList = mockSlider;

    public currentSlide: number = 0;
    public currentTab: string;

    public interval;

    public objectId: string;
    public contentSnippet: IObjectGallerySnippet;
    public tabSnippet: IObjectTabsSnippet;
    public switchOn = false;

    public closeTabsModal = true;
    public closeContentModal = true;

    public uploadsPath = `/${OBJECTS_GALLERY_UPLOADS_PATH}`;

    constructor(
        private galleryService: ObjectsItemGalleryAdminService,
        private activatedRoute: ActivatedRoute
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;

        this.getTabsThanContent();
        this.slideShow();
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
        console.log('this.currentTab getContent: ', this.currentTab);
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
