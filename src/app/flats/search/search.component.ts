import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output } from '@angular/core';
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

export class SearchComponent implements OnInit, OnChanges, OnDestroy {

    public outputFlatsList: IAddressItemFlat[] = [];
    public searchFlats: IAddressItemFlat[] = [];
    public count: number;
    public skip: number;
    public form: any;
    public sort: string = FormConfig.sort;
    public params: any;
    public isLoadMoreBtn = false;

    @Input() public showSearchWindow: boolean;
    @Input() public parentPlan: boolean;
    @Output() public flatsChanged: EventEmitter<IAddressItemFlat[]> = new EventEmitter();

    constructor(
        public router: Router,
        public searchService: SearchService,
        public platform: PlatformDetectService,
        public windowScrollLocker: WindowScrollLocker
    ) {}

    public ngOnInit() {
        if (this.platform.isBrowser) {
            if (!this.showSearchWindow) {return; }
        }
    }

    public formChange(form) {
        this.form = form;
        if (!this.showSearchWindow) {return; }

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
            params['rooms'] = (form.rooms).map((index, i) => (index) ? (i === 4) ? 0 : i + 1 : false).filter((i) => i !== false).join(',');
        }

        if ( 'houses' in form && form.houses.length > 0 ) {
            params['houses'] = (form.houses).join(',');
        }

        this.params = params;
        this.skip = 0;
        this.outputFlatsList = [];

        this.getFlats(params);
    }

    public getFlats(params) {

        this.router.navigate([this.router.url.split('?')[0]], {queryParams: params});
        this.searchService.getObjects(params).subscribe(
            (data: IAddressItemFlat[]) => {
                this.count = data.length;
                this.searchFlats = data;
                this.sortFlats();
                this.loadMore();
                this.flatsChanged.emit(this.searchFlats);
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

    public ngOnChanges() {
        if (this.showSearchWindow) {
            setTimeout(() => {
                this.formChange(this.form);
                this.windowScrollLocker.unblock();
            }, 500); // таймаут чтобы анимация открытия окна отработала без тормозов

        } else {
            this.router.navigate([this.router.url.split('?')[0]]);
            this.outputFlatsList = [];
            setTimeout(() => {
                this.windowScrollLocker.block();
            }, 130); // таймаут чтобы при смене роута на этой же и других страницах экран успел проскроллиться вверх перед блокировкой скролла
        }
    }

    public sortChange(sort) {
        this.sort = sort;
        this.skip = 0;
        this.outputFlatsList = [];

        this.sortFlats();
        this.loadMore();
    }

    public sortFlats() {
        this.searchService.sortFlats(this.sort, this.searchFlats);
    }

    public ngOnDestroy() {
        this.windowScrollLocker.unblock();
    }
}
