import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { JkObjectsListService } from './jk-objects-list.service';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
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
export class JkObjectsListComponent implements OnInit, OnDestroy {

    @Input()
    isMainPage = false;

    public showMap = false;
    public snippets: IObjectSnippet[];

    public flats: IAddressItemFlat[];
    public closeModal = true;
    public authorizationEvent;
    public isAuthorizated = false;

    public minPricePlaceholder: string;
    public maxPricePlaceholder: string;
    public btnList: any[] = [];
    public isLoaded = false;
    // открытие формы редактирования-создания
    public redactId: any;

    public minPriceByMod = {};

    constructor(
        public router: Router,
        private authorization: AuthorizationObserverService,
        private objectService: JkObjectsListService,
    ) {}

    ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
            this.getObjects([]);
        });

        this.objectService.getSnippets()
            .subscribe((data) => {
                this.snippets = data;
                this.getDistricts();
                // this.getMinPrice(data);
                this.objectService.getFlats({type: 'КВ,АП', status: '4'})
                    .subscribe((flats) => {
                        this.flats = flats;
                        this.getMinMaxPrice(flats);
                        this.getMinPrice(this.snippets, flats);
                    });
            });
    }

    public getObjects(params) {
        if (!this.isMainPage) {
            this.router.navigate([this.router.url.split('?')[0]], { queryParams: params, skipLocationChange: true });
        }

        if (params.priceMin === '') {
            delete params.priceMin;
        }
        if (params.priceMax === '') {
            delete params.priceMax;
        }

        if (this.isAuthorizated) {
            this.objectService.getSnippets().subscribe(
                (data) => {
                    this.snippets = data;
                    this.filterSnippets();
                    setTimeout(() => {
                        this.getMinPrice(this.snippets, this.flats);
                    }, 800);
                },
                (err) => console.log(err)
            );
        } else {
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
                    if (item.publish || this.isAuthorizated) {
                        filteredSnippets.push(item);
                    }
                }
            });
        }
        this.snippets = filteredSnippets;
    }

    ngOnDestroy() {
        if (this.authorizationEvent) {
            this.authorizationEvent.unsubscribe();
        }
    }

    public createSnippet() {
        if ( this.isAuthorizated ) {
            this.closeModal = false ;
        }
    }

    public redactSnippet(id) {
        if ( this.isAuthorizated ) {
            this.redactId = id;
            this.closeModal = false;
        }
    }

    public deleteSnippet(id) {
        if ( this.isAuthorizated ) {
            if (confirm('Вы точно хотите удалить объект?')) {
                this.objectService.deleteSnippet(id)
                    .subscribe(
                        (data) => {
                                this.snippetsChange(data);
                            },
                        (err) => console.error(err)
                    );
            }
        }
    }

    public updateSnippet(snippet) {
        this.objectService.updateSnippet(snippet._id, snippet)
            .subscribe(
                () => {
                   this.snippetsChange(this.snippets);
                },
                (err) => console.error(err)
            );
    }

    public snippetsChange(snippets) {
        this.snippets = snippets;
        this.getDistricts();
        this.router.navigate([this.router.url.split('?')[0]]);
    }

    private getDistricts() {
        this.btnList = [];
        this.btnList.push({ name: 'Все районы', value: 'Все районы' });
        this.snippets.forEach((item) => {
            if (!this.btnList.some((btn) => btn.value === item.district)) {
                this.btnList.push({ name: item.district, value: item.district });
            }
        });
        this.isLoaded = true;
    }

    private getMinMaxPrice(flats) {
        const price = flats.map((flat) => flat.price);

        this.minPricePlaceholder = price.length > 0 ? Math.min(...price).toFixed(0) : '0';
        this.maxPricePlaceholder = price.length > 0 ? Math.max(...price).toFixed(0) : '0';
    }

    public isShowMap() {
        setTimeout( () => {
            this.showMap = !this.showMap;
        }, 300);
    }

    private getMinPrice(jkList: IObjectSnippet[], flats) {
        console.log('jkList: ', jkList);
        console.log('flats: ', flats);
        jkList.forEach( jk => {
            if (jk.subtext) { return; }
            const price = flats.filter(flat => flat.mod === jk.mod).map(flat => flat.price);
            if (!price.length) { return; }
            const minPrice = ( Math.min(...price) / 1000000 ).toFixed(2);
            jk.subtext = `Квартиры от ${minPrice} млн. руб.`;
        });
        console.log('this.minPriceByMod: ', this.minPriceByMod);
    }
}
