import { IFlatWithDiscount } from '../../../../serv-files/serv-modules/addresses-api/addresses.config';
import { Component, Input, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FlatsDiscountService } from '../../commons/flats-discount.service';
import { FlatsService } from '../flats.service';
import { FavoritesService } from '../../favorites/favorites.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

@Component({
    selector: 'app-search-output',
    templateUrl: './search-output.component.html',
    styleUrls: ['./search-output.component.scss']

})

export class SearchOutputComponent implements OnInit {

    @Input() public flatsList: IFlatWithDiscount[] = [];

    public showApartmentWindow = false;
    public selectedFlatIndex: number;

    @ViewChild('container', { static: false })
    public container: ElementRef;

    public isLoading = true;

    constructor(
        private flatsDiscountService: FlatsDiscountService,
        private searchService: FlatsService,
        public favoritesService: FavoritesService,
        public windowScrollLocker: WindowScrollLocker
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

    public getDiscount(flat): number {
        return this.flatsDiscountService.getDiscount(flat);
    }

    public inFavorite(flat): boolean {
        return this.favoritesService.inFavorite(flat);
    }

    public setFavorite(flat): void {
        flat.inFavorite = !flat.inFavorite;
        this.favoritesService.setFavorite(flat);
    }

    public openApartmentModal(index) {
        this.selectedFlatIndex = index;
        this.windowScrollLocker.block();
        this.showApartmentWindow = true;
    }
 }
