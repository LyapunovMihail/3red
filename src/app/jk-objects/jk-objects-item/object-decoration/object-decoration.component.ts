import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { slider } from './mockSlider';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import {
    IDecorationData,
    IObjectDecorationSnippet,
    OBJECTS_DECORATION_UPLOADS_PATH
} from '../../../../../serv-files/serv-modules/jk-objects/decoration-api/objects-decoration.interfaces';
import { ActivatedRoute } from '@angular/router';
import { ObjectDecorationAdminService } from './object-decoration-content-admin/object-decoration-admin.service';
import { Uploader } from 'angular2-http-file-upload/uploader/uploader';

@Component({
    selector: 'app-object-item-decoration',
    templateUrl: 'object-decoration.component.html',
    styleUrls: [
        'object-decoration.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        ObjectDecorationAdminService,
        Uploader
    ]
})

export class ObjectDecorationComponent implements OnInit, OnChanges {

    @Input()
    public isAuthorizated = false;

    public mockSlider = slider;
    public sliderContent = slider[0];
    public currentSlide = 0;

    public currentTab: IDecorationData;
    public currentType: string;

    public objectId: string;
    public contentSnippet: IObjectDecorationSnippet;
    public typesSnippet: IObjectTabsSnippet;
    public switchOn = false;

    public closeTabsModal = true;
    public closeContentModal = true;

    public uploadsPath = `/${OBJECTS_DECORATION_UPLOADS_PATH}`;

    constructor(
        private decorationService: ObjectDecorationAdminService,
        private activatedRoute: ActivatedRoute,
        public ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        // this.getTypes();
        this.getTypesThanContent();
    }


    public getTypesThanContent() {
        this.decorationService.getTypesSnippetById(this.objectId).subscribe((data) => {
            this.typesSnippet = data;
            this.getContent();
        }, (error) => {
            console.error(error);
        });
    }
    //
    // public refreshTabs(data) {
    //     this.tabSnippet = data;
    //     if (this.tabSnippet) {
    //         if (this.tabSnippet.decoration.length && this.tabSnippet.decoration.some((tab) => tab.show)) {
    //             this.currentTab = this.tabSnippet.decoration.find((tab) => tab.show);
    //         }
    //         if (this.tabSnippet.decorationType.length) {
    //             this.currentType = this.tabSnippet.decorationType[0];
    //         }
    //     }
    //     this.getContent();
    // }

    public getContent() {
        this.decorationService.getContentSnippetByIdAndTab(this.objectId).subscribe((data) => {
            this.contentSnippet = data;
            if (this.contentSnippet) {
                this.switchOn = this.contentSnippet.switchOn;
                this.setCurrentTab();
            }
        }, (error) => {
            console.error(error);
        });
    }

    public ngOnChanges() {
        this.setCurrentTab();
    }

    public setCurrentTab() {
        if (this.contentSnippet && this.contentSnippet.data && this.contentSnippet.data.length && this.contentSnippet.data.some((item) => item.tab.show)) {
            this.currentTab = this.contentSnippet.data.find((item) => item.tab.show && ('turnOnDecorationTypes' in item.tab));
            console.log('this.currentTab setCurrentTab: ', this.currentTab);
            if (this.typesSnippet && this.typesSnippet.decorationType.length && this.currentTab) {
                this.changeTab(this.currentTab);
            }
        }
    }

    public changeTab(tab) {
        this.currentTab = tab;
        const tabWithType = this.contentSnippet.data.find((item) => (item.tab.name === this.currentTab.tab.name && item.tab.show) && !!item.tab.decorationType);
        if (tabWithType) {
            this.currentTab = tabWithType;
            this.currentType = this.currentTab.tab.decorationType; // в массиве contentSnippet.data содержатся табы без decorationType и могут быть такие же табы с decorationType. Когда меняется таб,
        } else {                                                   // происходит поиск таких же табов с decorationType'ами. Если такой находится, то currentType меняется на decorationType установленного таба
            this.currentType = null;
        }
        this.currentSlide = 0;
        console.log('this.currentTab changeTab: ', this.currentTab);
        // this.getContent();
    }

    public checkTabImages(type) {
        return this.contentSnippet.data.some((item) => item.tab.name === this.currentTab.tab.name && item.tab.decorationType === type && item.images.length > 0);

    }

    public changeType(type) { // когда устанавливается новый тип отделки из массива typesSnippet.decorationType, происходит и переключение на таб с таким же decorationType
        this.currentType = type;
        this.currentTab = this.contentSnippet.data.find((item) => item.tab.name === this.currentTab.tab.name && item.tab.decorationType === this.currentType);
        // this.getContent();
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.currentTab.images.length - 1 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.currentTab.images.length - 1;
    }

    public changeNav(num) {
        this.currentSlide = 0;
        this.sliderContent = this.mockSlider[num];
    }

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.contentSnippet, objectId: this.objectId, switchOn: this.switchOn};
        this.decorationService.setContentSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }
}
