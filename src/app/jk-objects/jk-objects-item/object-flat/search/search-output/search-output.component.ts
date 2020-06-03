import { IFlatWithDiscount } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.config';
import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FlatsDiscountService } from '../../../../../commons/flats-discount.service';
import { WindowScrollLocker } from '../../../../../commons/window-scroll-block';
import { SearchService } from '../search.service';
import { ObjectFlatsService } from '../../object-flats.service';
import { IObjectSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { FavoritesService } from '../../../../../favorites/favorites.service';

@Component({
    selector: 'app-search-output',
    templateUrl: './search-output.component.html',
    styleUrls: ['./search-output.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})

export class SearchOutputComponent implements OnInit {

    public isLoading = true;
    public showApartmentWindow = false;
    public selectedFlatIndex: number;
    public jk: IObjectSnippet;
    @Input() public flatsList: IFlatWithDiscount[] = [];
    @Input() public count: number;
    @Input() public showMore: boolean;
    @Output() public loadMore = new EventEmitter<boolean>();

    @ViewChild('container')
    public container: ElementRef;

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        private flatsDiscountService: FlatsDiscountService,
        private favoritesService: FavoritesService,
        private searchService: SearchService,
        private objectFlatsService: ObjectFlatsService
    ) {}

    public ngOnInit() {
        this.jk = this.objectFlatsService.getData().jk;
        this.searchService.getOutputFlatsChanged()
            .subscribe((flats: IFlatWithDiscount[]) => {
                this.flatsList = flats;
                this.flatsList.map((flat) => {
                    flat.discount = this.getDiscount(flat);
                    flat.inFavorite = this.inFavorite(flat);
                    return flat;
                });
            });

        this.searchService.getLoadingIndicator()
            .subscribe((item) => this.isLoading = item);
    }

    public flatsCount() {
        return this.count;
    }

    public getDiscount(flat): number {
        return this.flatsDiscountService.getDiscount(flat);
    }

    public inFavorite(flat): boolean {
        return this.favoritesService.inFavorite(flat);
    }

    public openApartmentModal(index) {
        this.selectedFlatIndex = index;
        this.windowScrollLocker.block();
        this.showApartmentWindow = true;
    }

    public scrollToTop() {
        window.scrollTo(0, this.container.nativeElement.offsetTop);
    }
 }
