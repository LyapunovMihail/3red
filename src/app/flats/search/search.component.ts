import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { FormConfig } from './search-form/search-form.config';
import { SearchService } from './search.service';
import { PlatformDetectService } from '../../platform-detect.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
import { IFlatsSearchParams } from '../../../../serv-files/serv-modules/seo-api/seo.interfaces';
import { SearchFormComponent } from './search-form/search-form.component';

@Component({
    selector: 'app-flats-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [
        WindowScrollLocker,
        SearchService
    ]
})

export class SearchComponent implements OnInit, OnDestroy {

    public authorizationEvent;
    public isAuthorizated = false;

    public outputFlatsList: IAddressItemFlat[] = [];
    public searchFlats: IAddressItemFlat[] = [];
    public count: number;
    public skip: number;
    public form: any;
    public sort: string = FormConfig.sort;
    public params: any;
    public isLoadMoreBtn = false;
    public config: any;
    public housesBtnList: any = [];
    public modsBtnList: any = [];

    public isSeoPageModalOpen = false;
    public seoPageParams: IFlatsSearchParams;
    public showPopular = false;

    @ViewChild(SearchFormComponent)
    private formComponent: SearchFormComponent;

    constructor(
        private authorization: AuthorizationObserverService,
        public router: Router,
        public searchService: SearchService,
        public platform: PlatformDetectService,
        public windowScrollLocker: WindowScrollLocker,
        private route: ActivatedRoute
    ) {}

    public ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization()
            .subscribe((val) => {
                this.isAuthorizated = val;
            });

        this.getData(this.route.snapshot.queryParams, true);
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

                if (!this.seoPageParams) {
                    this.router.navigate([this.router.url.split('?')[0]], {queryParams: newParams});
                    // if (firstBoot) { // Если первая загрузка - после подгрузки конфига перевбиваем параметры запроса
                    this.router.navigate([this.router.url.split('?')[0]], {queryParams: params});
                    // }
                } else {
                    this.formComponent.buildForm(newParams);
                    this.formComponent.buildForm(params);
                }


            },
            (err) => {
                console.log(err);
            }
        );
    }

    public formChange(changedForm) {
        this.searchService.setLoadingIndicator(true);
        this.form = changedForm.form;

        const { form, isSeoPageParamsLoaded, isEmptySeoPageParams } = changedForm;

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

        if (form.status.length > 0) {
            params.status = (form.status).join(',');
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
            params.mod = form.mod;
        }

        if ( 'isEuro' in form && form.isEuro.length) {
            params.isEuro = (form.isEuro).join(',');
        }

        if (this.params && this.params.mod !== params.mod) {
            delete params.housesMods;
            this.getData(params, false); // При смене таба подгружаем конфиг с параметрами
            this.params = params;
            return;
        }

        this.params = params;
        this.skip = 0;
        this.outputFlatsList = [];

        this.seoPageParams = params;

        if (isSeoPageParamsLoaded && isEmptySeoPageParams) {
            this.router.navigate([this.router.url.split('?')[0]], {queryParams: params});
        }

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
    public loadMore(showMore?: boolean) {
        for (let i = 0; i < 10; i++) {
            if (this.skip < this.searchFlats.length) {
                this.outputFlatsList.push(this.searchFlats[this.skip++]);
            }
        }
        this.isLoadMoreBtn = this.skip < this.searchFlats.length;
        this.searchService.setOutputFlatsChanged(this.outputFlatsList, showMore);
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

    public ngOnDestroy() {
        if (this.authorizationEvent) {
            this.authorizationEvent.unsubscribe();
        }
        this.windowScrollLocker.unblock();
    }
}
