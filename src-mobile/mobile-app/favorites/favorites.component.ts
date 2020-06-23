import { Component, OnInit } from '@angular/core';
import { FavoritesService } from './favorites.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

    constructor(
        public favoritesService: FavoritesService
    ) { }

    ngOnInit() {

    }

}
