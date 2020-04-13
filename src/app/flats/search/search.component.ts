import { Router } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { FormConfig } from './search-form/search-form.config';
import { SearchService } from './search.service';
import { PlatformDetectService } from '../../platform-detect.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

@Component({
    selector: 'app-flats-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    providers: [
        WindowScrollLocker,
        SearchService
    ]
})

export class SearchComponent implements OnDestroy {

    public outputFlatsList: IAddressItemFlat[] = [];
    public searchFlats: IAddressItemFlat[] = [];
    public count: number;
    public skip: number;
    public form: any;
    public sort: string = FormConfig.sort;
    public params: any;
    public isLoadMoreBtn = false;

    public housesBtnList: any = [];
    public modsBtnList: any = [];

    constructor(
        public router: Router,
        public searchService: SearchService,
        public platform: PlatformDetectService,
        public windowScrollLocker: WindowScrollLocker
    ) {}

    public formChange(form) {
        this.form = form;

        const params = {
            spaceMin: form.space.min,
            spaceMax: form.space.max,
            priceMin: form.price.min,
            priceMax: form.price.max,
            floorMin: form.floor.min,
            floorMax: form.floor.max,
        };

        if (form.type.length > 0) {
            params['type'] = (form.type).join(',');
        }

        if (form.decoration.length > 0) {
            params['decoration'] = (form.decoration).join(',');
        }

        if ( 'rooms' in form && form.rooms.some((i) => i === true) ) {
            params['rooms'] = (form.rooms).map((index, i) => (index) ? i : false).filter((i) => i !== false).join(',');
        }

        if ( 'sections' in form && form['sections'].length > 0 ) {
            params['sections'] = (form.sections).join(',');
        }

        if ( 'housesMods' in form && form.housesMods.length > 0 ) {                                                  // для квартир объектов надо отдавать housesMods ( один дом ), или пустую строку '';
            params['housesMods'] = form.housesMods.map((item) => JSON.stringify(item)).join('nzt;');       // if ( 'housesMods' in form && form.housesMods.length > 0 ) {
            console.log('params housesMods: ', params['housesMods']);                                                //          params['housesMods'] = form.housesMods; дом здесь один либо его нету
        }                                                                                                    //     }

        if ( 'mod' in form && form.mod.length) { // mod используется только для составления массива домов housesBtnList, а в него уже записываются моды
            params['mod'] = form.mod;

        }
        if (this.params && this.params.mod !== params['mod']) {
            delete params['housesMods'];
        }

        this.params = params;
        this.skip = 0;
        this.outputFlatsList = [];

        this.getFlats(params);
    }

    public getFlats(params) {
        this.router.navigate([this.router.url.split('?')[0]], {queryParams: params});
        console.log('params.mod: ', params.mod);
        this.searchService.getFlatsMultiple(params).subscribe(
            (data) => {
                console.log('data: ', data);
                data.flats = data.flats.filter((flat) => flat.status !== '8');
                this.count = data.flats.length;
                this.searchFlats = data.flats;
                this.sortFlats(this.sort);
                this.loadMore();
                this.modsBtnList = data.modsBtnList;
                this.housesBtnList = data.housesBtnList;
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
        this.windowScrollLocker.unblock();
    }
}
