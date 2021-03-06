import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAddressItemFlat } from '../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { FormConfig } from './search-form/search-form.config';
import { FlatsService } from './flats.service';
import { PlatformDetectService } from '../platform-detect.service';
import { WindowScrollLocker } from '../commons/window-scroll-block';
import { ViewportScroller } from '@angular/common';

@Component({
    selector: 'app-flats',
    templateUrl: './flats.component.html',
    styleUrls: ['./flats.component.scss'],
    providers: [
        WindowScrollLocker,
        FlatsService
    ]
})

export class FlatsComponent implements OnInit, OnDestroy {

    public outputFlatsList: IAddressItemFlat[] = [];
    public searchFlats: IAddressItemFlat[] = [];
    public count: number;
    public skip: number;
    public form: any;
    public sort: string = FormConfig.sort;
    public params: any = {mod: ''};
    public isLoadMoreBtn = false;
    public config: any;
    public housesBtnList: any = [];
    public modsBtnList: any = [];
    public showFilter = false;

    constructor(
        public router: Router,
        public searchService: FlatsService,
        public platform: PlatformDetectService,
        public windowScrollLocker: WindowScrollLocker,
        private route: ActivatedRoute,
        private viewportScroller: ViewportScroller
    ) {}

    public ngOnInit() {
        this.getData(this.route.snapshot.queryParams, true);
    }

    public openFilter() {
        this.showFilter = !this.showFilter;
        this.showFilter === true ? this.windowScrollLocker.block() : this.windowScrollLocker.unblock();
    }

    public getData(params, firstBoot) {
        this.searchService.getFlatsData({mod: params.mod || '', type: 'КВ, АП'}).subscribe(
            (data) => {
                this.modsBtnList = data.modsBtnList;
                this.housesBtnList = data.housesBtnList;
                this.config = data.config;
                const newParams = {
                    ...params,
                    spaceMin: this.config.space.min,
                    spaceMax: this.config.space.max,
                    priceMin: this.config.price.min,
                    priceMax: this.config.price.max,
                    floorMin: this.config.floor.min,
                    floorMax: this.config.floor.max,
                };

                this.router.navigate([this.router.url.split('?')[0]], {queryParams: newParams});
                // if (firstBoot) { // Если первая загрузка - после подгрузки конфига перевбиваем параметры запроса
                this.router.navigate([this.router.url.split('?')[0]], {queryParams: params});
                // }
            },
            (err) => {
                console.log(err);
            }
        );
    }

    public formChange(form) {
        this.searchService.setLoadingIndicator(true);
        this.form = form;

        const params: any = {
            spaceMin: form.space.min,
            spaceMax: form.space.max,
            priceMin: form.price.min,
            priceMax: form.price.max,
            floorMin: form.floor.min,
            floorMax: form.floor.max,
        };

        if (form.type.length > 0) {
            params.type = (form.type).join(',');
        } else {
            params.type = 'КВ,АП';
        }

        if (form.decoration.length > 0) {
            params.decoration = (form.decoration).join(',');
        }

        if ( 'rooms' in form && form.rooms.some((i) => i === true) ) {
            params.rooms = (form.rooms).map((index, i) => (index) ? i : false).filter((i) => i !== false).join(',');
        }

        if ( 'sections' in form && form.sections.length > 0 ) {
            params.sections = (form.sections).join(',');
        }

        if ( 'housesMods' in form && form.housesMods.length > 0 ) {
            params.housesMods = form.housesMods.map((item) => JSON.stringify(item)).join('nzt;');
        }

        if ( 'mod' in form && form.mod.length) { // mod используется только для составления массива домов housesBtnList, а в него уже записываются моды
            params.mod = this.params.mod || form.mod;
        }

        // if (this.params && this.params.mod !== params.mod) {
        //     delete params.housesMods;
        //     this.getData(params, false); // При смене таба подгружаем конфиг с параметрами
        //     this.params = params;
        //     return;
        // }

        this.params = params;
        this.skip = 0;
        this.outputFlatsList = [];

        this.router.navigate([this.router.url.split('?')[0]], {queryParams: params});

        this.getFlats(params);
    }

    public getFlats(params) {
        this.searchService.getFlatsMultiple({ modsBtnList: this.modsBtnList, params }).subscribe(
            (flats) => {
                flats = flats.filter((flat) => flat.status !== '8');
                this.count = flats.length;
                this.searchFlats = flats;
                this.sortFlats(this.sort);
                this.loadMore();
                this.searchService.setLoadingIndicator(false);
            },
            (err) => {
                console.log(err);
            }
        );
    }
    public loadMore() {
        for (let i = 0; i < 10; i++) {
            if (this.skip < this.searchFlats.length) {
                this.outputFlatsList.push(this.searchFlats[this.skip++]);
            }
        }
        this.isLoadMoreBtn = this.skip < this.searchFlats.length;
        this.searchService.setOutputFlatsChanged(this.outputFlatsList);
    }
    public modChange() {
        delete this.params.housesMods;
        this.getData(this.params, false); // При смене таба подгружаем конфиг с параметрами
    }
    public sortChange(sort) {
        this.sort = sort;
        this.skip = 0;
        this.outputFlatsList = [];

        this.sortFlats(this.sort);
        this.loadMore();
    }
    private sortFlats(sort) {
        this.searchService.sortFlats(sort, this.searchFlats);
    }

    public scrollToTop() {
        if (!this.platform.isBrowser) { return false; }

        // $('html, body').animate({scrollTop: 0 }, 200);
        this.viewportScroller.scrollToPosition([0, 200]);
    }

    public ngOnDestroy() {
        this.windowScrollLocker.unblock();
    }
}
