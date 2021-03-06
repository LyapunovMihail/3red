import { ChangeDetectorRef, Component, Input, OnChanges, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { slider } from './mockSlider';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import {
    IDecorationData,
    IObjectDecorationSnippet,
    OBJECTS_DECORATION_UPLOADS_PATH
} from '../../../../../serv-files/serv-modules/jk-objects/decoration-api/objects-decoration.interfaces';
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

export class ObjectDecorationComponent implements OnInit, OnChanges, AfterViewInit {

    @Input()
    public isAuthorizated = false;
    @Input()
    public objectId: string;

    public mockSlider = slider;
    public sliderContent = slider[0];
    public currentSlide = 0;

    public currentTab: IDecorationData; 
    public currentType: string;

    public contentSnippet: IObjectDecorationSnippet;
    public typesSnippet: IObjectTabsSnippet;
    public switchOn = false;

    public closeTabsModal = true;
    public closeContentModal = true;
    public interval;

    public uploadsPath = `/${OBJECTS_DECORATION_UPLOADS_PATH}`;

    public navList;
    public navActive = {
        widthActive: 0,
        offsetLeftActive: 0
    };

    constructor(
        public elRef: ElementRef,
        private decorationService: ObjectDecorationAdminService,
        public ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
        this.getTypesThanContent();
        // this.slideShow();
    }
    ngAfterViewInit() {
        setTimeout( () => this.defaultElem(), 2000);
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
            if (this.typesSnippet && this.typesSnippet.decorationType && this.typesSnippet.decorationType.length && this.currentTab) {
                this.changeTab(this.currentTab);
                // this.buildTabForNav(this.contentSnippet);
            }
        }
    }

    public changeTab(tab) {
        this.currentTab = tab;
        const tabWithType = this.contentSnippet.data.find((item) => (item.tab.name === this.currentTab.tab.name && item.tab.show) && !!item.tab.decorationType && item.images.length > 0);
        if (tabWithType) {
            this.currentTab = tabWithType;
            this.currentType = this.currentTab.tab.decorationType; // ?? ?????????????? contentSnippet.data ???????????????????? ???????? ?????? decorationType ?? ?????????? ???????? ?????????? ???? ???????? ?? decorationType. ?????????? ???????????????? ??????,
        } else {                                                   // ???????????????????? ?????????? ?????????? ???? ?????????? ?? decorationType'??????. ???????? ?????????? ??????????????????, ???? currentType ???????????????? ???? decorationType ???????????????????????????? ????????
            this.currentType = null;
        }
        this.currentSlide = 0;
        this.slideShow();
    }
    public buildTabForNav(list) {
        let result = [];
        list.data.forEach( (item, i) => {
            result.push({
                name: item.tab.name,
                show: item.tab.show,
                decorationType: item.tab.decorationType
            });
        });
        // this.navList = result.filter( (item, i) => result.indexOf(item.name.trim()) === i);
        this.navList = result.filter((thing, index, self) =>
            index === self.findIndex((t) => ( t.name === thing.name ))
        );
    }

    public checkTabImages(type) {
        return this.contentSnippet.data.some((item) => item.tab.name === this.currentTab.tab.name && item.tab.decorationType === type && item.images.length > 0);

    }

    public changeType(type) { // ?????????? ?????????????????????????????? ?????????? ?????? ?????????????? ???? ?????????????? typesSnippet.decorationType, ???????????????????? ?? ???????????????????????? ???? ?????? ?? ?????????? ???? decorationType
        this.currentType = type;
        this.currentTab = this.contentSnippet.data.find((item) => item.tab.name === this.currentTab.tab.name && item.tab.decorationType === this.currentType);
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.currentTab.images.length - 1 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.currentTab.images.length - 1;
    }

    public slideShow() {
        this.interval = setInterval(() => {
            this.currentSlide < this.contentSnippet.data.length - 1
                ? this.nextBtn()
                : this.currentSlide = 0;
        }, 5000);
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


    public getActiveElement(event) {
        const elem = event.target;

        this.navActive.widthActive = elem.offsetWidth;
        this.navActive.offsetLeftActive = elem.offsetLeft;
    }
    public defaultElem() {
        if (this.elRef.nativeElement.querySelector('.object-decoration__nav-item_active')) {
            const el = this.elRef.nativeElement.querySelector('.object-decoration__nav-item_active');
            this.navActive.widthActive = el.offsetWidth;
            this.navActive.offsetLeftActive = el.offsetLeft;
            this.ref.detectChanges();
        } else {
            setTimeout(() => this.defaultElem(), 2000);
        }
    }
}
