import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IFlatWithDiscount } from '../../../../serv-files/serv-modules/addresses-api/addresses.config';
import { FavoritesService } from '../../favorites/favorites.service';

@Component({
    selector: 'app-flat-snippet',
    templateUrl: './flat-snippet.component.html',
    styleUrls: ['./flat-snippet.component.scss']
})
export class FlatSnippetComponent implements OnInit {

    @Input()
    public flatData: IFlatWithDiscount;
    @Input()
    public flatsList: IFlatWithDiscount[] = [];
    @Input()
    public jkName: string;
    @Output()
    public openApartmentModal = new EventEmitter<number>();

    constructor(
        public favoritesService: FavoritesService,
    ) {}

    ngOnInit() {
    }

    public setFavorite(flat): void {
        flat.inFavorite = !flat.inFavorite;
        this.favoritesService.setFavorite(flat);
    }
}
