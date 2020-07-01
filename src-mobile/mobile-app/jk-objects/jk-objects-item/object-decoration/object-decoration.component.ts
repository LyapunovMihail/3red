import { ChangeDetectorRef, Component, Input, OnChanges, OnInit } from '@angular/core';
import { IObjectTabsSnippet } from '../../../../../serv-files/serv-modules/jk-objects/tabs-api/objects-tabs.interfaces';
import {
    IDecorationData,
    IObjectDecorationSnippet,
    OBJECTS_DECORATION_UPLOADS_PATH
} from '../../../../../serv-files/serv-modules/jk-objects/decoration-api/objects-decoration.interfaces';
import { ObjectDecorationAdminService } from './object-decoration-admin.service';

@Component({
    selector: 'app-object-item-decoration',
    templateUrl: 'object-decoration.component.html',
    styleUrls: [
        'object-decoration.component.scss',
        '../jk-objects-item.component.scss'
    ],
    providers: [
        ObjectDecorationAdminService
    ]
})

export class ObjectDecorationComponent implements OnInit, OnChanges {

    @Input()
    public objectId: string;

    public currentSlide = 0;

    public currentTab: IDecorationData;
    public currentType: string;

    public contentSnippet: IObjectDecorationSnippet;
    public typesSnippet: IObjectTabsSnippet;
    public switchOn = false;

    public uploadsPath = `/${OBJECTS_DECORATION_UPLOADS_PATH}`;

    constructor(
        private decorationService: ObjectDecorationAdminService,
        public ref: ChangeDetectorRef
    ) { }

    ngOnInit() {
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
            }
        }
    }

    public changeTab(tab) {
        this.currentTab = tab;
        const tabWithType = this.contentSnippet.data.find((item) => (item.tab.name === this.currentTab.tab.name && item.tab.show) && !!item.tab.decorationType && item.images.length > 0);
        if (tabWithType) {
            this.currentTab = tabWithType;
            this.currentType = this.currentTab.tab.decorationType; // в массиве contentSnippet.data содержатся табы без decorationType и могут быть такие же табы с decorationType. Когда меняется таб,
        } else {                                                   // происходит поиск таких же табов с decorationType'ами. Если такой находится, то currentType меняется на decorationType установленного таба
            this.currentType = null;
        }
        this.currentSlide = 0;
    }

    public checkTabImages(type) {
        return this.contentSnippet.data.some((item) => item.tab.name === this.currentTab.tab.name && item.tab.decorationType === type && item.images.length > 0);

    }

    public changeType(type) { // когда устанавливается новый тип отделки из массива typesSnippet.decorationType, происходит и переключение на таб с таким же decorationType
        this.currentType = type;
        this.currentTab = this.contentSnippet.data.find((item) => item.tab.name === this.currentTab.tab.name && item.tab.decorationType === this.currentType);
    }

    public nextBtn() {
        this.currentSlide = (this.currentSlide < this.currentTab.images.length - 1 ) ? this.currentSlide + 1 : 0;
    }

    public prevBtn() {
        this.currentSlide = ( this.currentSlide > 0 ) ? this.currentSlide - 1 : this.currentTab.images.length - 1;
    }
}
