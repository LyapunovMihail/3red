import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { IAddressItemFlat } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { FormConfig } from './search-form/search-form.config';
import { SearchService } from './search.service';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';

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
    public objectId: string;

    @Input() public showChess;
    @Output() public flatsChanged: EventEmitter<IAddressItemFlat[]> = new EventEmitter();

    constructor(
        public router: Router,
        public searchService: SearchService,
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
        } else {
            params['type'] = 'КВ,АП';
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

        if ( 'houses' in form && form.houses.length > 0 ) {
            params['houses'] = form.houses;
        }

        if ('mod' in form) {
            params['mod'] = form.mod;
        }

        this.params = params;
        this.skip = 0;
        this.outputFlatsList = [];

        this.getFlats(params);
    }

    public getFlats(params) {
        let url = this.router.url.split('?')[0];
        const urlMas = url.split('/');
        url = url.slice(0, -urlMas[urlMas.length - 1].length); // убираем из урлы старый номер дома
        const house = params.houses ? params.houses : 'all';

        this.router.navigate([url + house], { queryParams: params }); // добавляем в параметры урлы номер дома чтобы извлечь его в house компоненте

        this.searchService.getFlats(params).subscribe(
            (data: IAddressItemFlat[]) => {
                data = data.filter((flat) => flat.status !== '8');
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
