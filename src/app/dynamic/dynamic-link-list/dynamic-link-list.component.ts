import { PlatformDetectService } from './../../platform-detect.service';
import { IDynamicObject } from '../../../../serv-files/serv-modules/dynamic-api/dynamic.interfaces';
import { AfterViewInit, ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SVGLINKS } from './svgLinks';
import { DynamicLinkListService } from './dynamic-link-list.service';
declare let $: any;

@Component({
    selector: 'app-dynamic-link-list',
    templateUrl: './dynamic-link-list.component.html',
    styleUrls: ['./dynamic-link-list.component.scss'],
    providers: [
        PlatformDetectService,
        DynamicLinkListService
    ]
})

export class DynamicLinkListComponent implements OnInit, OnChanges, AfterViewInit {

    public linksArray: any[];

    @Input() month: number;
    @Input() year: number;
    @Input() objectsArray: IDynamicObject[] = [];

    constructor(
        public platform: PlatformDetectService,
        private dynamicLinkListService: DynamicLinkListService,
        public ref: ChangeDetectorRef
    ) { }

    public ngOnInit() {
        this.setLinksData();
    }

    ngAfterViewInit() {
        this.dynamicLinkListService.fillReadySegments(this.linksArray, true);
    }

    ngOnChanges(changes: SimpleChanges) {
        this.setLinksData();
        this.ref.detectChanges();
        this.dynamicLinkListService.fillReadySegments(this.linksArray, true);
    }

    // Скролл до якоря
    public scrollLink(link, year, month) {
        if (!this.platform.isBrowser) { return false; }
        if (year !== this.year && month !== this.month) { return false; }

        let destination = $(`#${link}`).offset().top;
        $('html:not(:animated),body:not(:animated)').animate({ scrollTop: destination - 30 }, 500);
        return false;
    }

    private setLinksData() {
        this.linksArray = JSON.parse(JSON.stringify(SVGLINKS)); // Копирование массива
        this.objectsArray.forEach((obj) => {
            if (obj.year !== this.year || obj.month !== this.month) { return; }
            if (obj.title.toLowerCase().indexOf('665') !== -1) { // Детский сад #665
                this.linksArray[0] = {...obj, ...this.linksArray[0]};
                this.linksArray[0].ready.value = obj.ready;
                this.linksArray[0]._id = obj._id;
            } else if (obj.title.indexOf('1') !== -1) {
                this.linksArray[1] = {...obj, ...this.linksArray[1]};
                this.linksArray[1].ready.value = obj.ready;
                this.linksArray[1]._id = obj._id;
            } else if (obj.title.indexOf('2') !== -1) {
                this.linksArray[2] = {...obj, ...this.linksArray[2]};
                this.linksArray[2].ready.value = obj.ready;
                this.linksArray[2]._id = obj._id;
            } else if (obj.title.indexOf('3') !== -1) {
                this.linksArray[3] = {...obj, ...this.linksArray[3]};
                this.linksArray[3].ready.value = obj.ready;
                this.linksArray[3]._id = obj._id;
            } else if (obj.title.indexOf('9') !== -1) {
                this.linksArray[9] = {...obj, ...this.linksArray[9]};
                this.linksArray[9].ready.value = obj.ready;
                this.linksArray[9]._id = obj._id;
            } else if (obj.title.indexOf('666') !== -1) { // Школа #666
                this.linksArray[11] = {...obj, ...this.linksArray[11]};
                this.linksArray[11].ready.value = obj.ready;
                this.linksArray[11]._id = obj._id;
            } else if (obj.title.indexOf('667') !== -1) { // Детский сад #667
                this.linksArray[12] = {...obj, ...this.linksArray[12]};
                this.linksArray[12].ready.value = obj.ready;
                this.linksArray[12]._id = obj._id;
            }
        });
    }
}
