import { Component, Input, OnInit } from '@angular/core';
import { IFlatWithDiscount } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.config';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';
import { FavoritesService } from '../../../../favorites/favorites.service';

@Component({
    selector: 'app-flats-list',
    templateUrl: './flats-list.component.html',
    styleUrls: ['./flats-list.component.scss'],
    providers: [
        WindowScrollLocker
    ]
})
export class FlatsListComponent implements OnInit {

    @Input() public flatsList: IFlatWithDiscount[] = [];

    public showApartmentWindow = false;
    public selectedFlatIndex: number;

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        private favoritesService: FavoritesService,
    ) {
    }

    ngOnInit() {
    }

    public openApartmentModal(index) {
        this.selectedFlatIndex = index;
        this.windowScrollLocker.block();
        this.showApartmentWindow = true;
    }

    public setFavorite(flat): void {
        flat.inFavorite = !flat.inFavorite;
        this.favoritesService.setFavorite(flat);
    }
}
