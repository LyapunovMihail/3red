import { IFlatWithDiscount } from '../../../../../serv-files/serv-modules/addresses-api/addresses.config';
import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef } from '@angular/core';
import { FlatsDiscountService } from '../../../commons/flats-discount.service';
import { SearchService } from '../search.service';
import { FavoritesService } from '../../../favorites/favorites.service';

@Component({
    selector: 'app-search-output',
    templateUrl: './search-output.component.html',
    styleUrls: ['./search-output.component.scss']

})

export class SearchOutputComponent implements OnInit {


    @Input() public flatsList: IFlatWithDiscount[] = [];
    @Input() public count: number;
    @Input() public showMore: boolean;
    @Output() public loadMore = new EventEmitter<boolean>();

    @ViewChild('container')
    public container: ElementRef;

    public isLoading = true;

    constructor(
        private flatsDiscountService: FlatsDiscountService,
        private searchService: SearchService,
        public favoritesService: FavoritesService
    ) {}

    public ngOnInit() {
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

    public scrollToTop() {
        window.scrollTo(0, 0);
        // window.scrollTo(0, this.container.nativeElement.offsetTop);
    }
 }
