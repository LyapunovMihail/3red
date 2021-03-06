import { Component, Input, OnInit } from '@angular/core';
import { JkObjectsListService } from './jk-objects-list.service';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { Router } from '@angular/router';
import { JkObjectsNumberPipe } from './jk-objects-number.pipe';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Component({
    selector: 'app-jk-objects-list',
    templateUrl: './jk-objects-list.component.html',
    styleUrls: ['./jk-objects-list.component.scss'],
    providers: [
        JkObjectsListService,
        JkObjectsNumberPipe
    ]
})
export class JkObjectsListComponent implements OnInit {

    @Input()
    isMainPage = false;

    public showMap = false;
    public showFilter = false;
    public snippets: IObjectSnippet[];

    public flats: IAddressItemFlat[];
    public closeModal = true;

    public minPriceConfig: number;
    public maxPriceConfig: number;
    public btnList: any[] = [];
    public isLoaded = false;
    // открытие формы редактирования-создания
    public redactId: any;

    constructor(
        public router: Router,
        private objectService: JkObjectsListService,
    ) {
    }

    ngOnInit() {
        this.getObjects([]);

        this.objectService.getSnippets()
            .subscribe((data) => {
                this.snippets = data;
                this.filterSnippets();
                this.getDistricts();

                this.objectService.getFlats({type: 'КВ,АП', status: '4'})
                    .subscribe((flats) => {
                        this.flats = flats;
                        this.getMinMaxPrice(flats);
                        this.getMinPrice(data, flats);
                        this.isLoaded = true;
                    });
            });
    }

    public getObjects(params) {
        if (!this.isMainPage) {
            this.router.navigate([this.router.url.split('?')[0]], { queryParams: params, skipLocationChange: true });
        }

        this.objectService.getSnippetsByParams(params).subscribe(
            (data) => {
                this.snippets = data;
                this.filterSnippets();
                setTimeout(() => {
                    this.getMinPrice(this.snippets, this.flats);
                }, 800);
            },
            (err) => console.log(err)
        );
    }

    public filterSnippets() {
        const filteredSnippets: IObjectSnippet[] = [];
        if (this.snippets && this.snippets.length > 0) {
            this.snippets.forEach((item) => {
                if (this.isMainPage) {
                    if (item.show_on_main && item.publish) {
                        filteredSnippets.push(item);
                    }
                } else {
                    if (item.publish) {
                        filteredSnippets.push(item);
                    }
                }
            });
        }
        this.snippets = filteredSnippets;
    }

    public snippetsChange(snippets) {
        this.snippets = snippets;
        this.getDistricts();
        this.router.navigate([this.router.url.split('?')[0]]);
    }

    private getDistricts() {
        this.btnList = [];
        this.btnList.push({ name: 'Любой район', value: 'Любой район' });
        this.snippets.forEach((item) => {
            if (!this.btnList.some((btn) => btn.value === item.district)) {
                this.btnList.push({ name: item.district, value: item.district, count: 1 });
            } else {
                this.btnList.find((btn) => btn.value === item.district).count++;
            }
        });
    }

    private getMinMaxPrice(flats) {
        const price = flats.map((flat) => flat.price);

        this.minPriceConfig = price.length > 0 ? Number(Math.min(...price).toFixed(0)) : 0;
        this.maxPriceConfig = price.length > 0 ? Number(Math.max(...price).toFixed(0)) : 0;
    }

    public isShowfilter() {
        setTimeout( () => {
            this.showFilter = !this.showFilter;
        }, 300);
    }

    public isShowMap() {
        setTimeout( () => {
            this.showMap = !this.showMap;
        }, 300);
    }
    private getMinPrice(jkList: IObjectSnippet[], flats) {
        jkList.forEach( jk => {
            if (jk.subtext) { return; }
            const price = flats.filter(flat => flat.mod === jk.mod).map(flat => flat.price);
            if (!price.length) { return; }
            const minPrice = ( Math.min(...price) / 1000000 ).toFixed(2);
            jk.subtext = `Квартиры от ${minPrice} млн. руб.`;
        });
    }
}
