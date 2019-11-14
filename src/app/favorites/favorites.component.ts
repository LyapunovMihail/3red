import { FavoritesService } from './../commons/favorites.service';
import { Router } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { IAddressItemFlat } from '../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { mockFlats } from './mockFlats';


@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

    public flats: IAddressItemFlat[] = [];
    public testFlats = mockFlats;
    public directionSort = false;
    public sortType = '';

    public formIsOpen = false;

    constructor(
        private favoritesService: FavoritesService,
        private router: Router
    ) {}

    public ngOnInit() {
        this.initFavoriteFlats();
    }

    public ngOnDestroy( ) {
    }

    public getDecorationText(dec: string): string {
        if (dec === '00') {
            return 'без отделки';
        } else if (dec === '01') {
            return 'с черновой отделкой';
        } else if (dec === '02') {
            return 'без отделки с перегородками';
        } else if (dec === '03') {
            return 'с чистовой отделкой';
        } else if (dec === '04') {
            return 'с чистовой(светлой) отделкой';
        } else if (dec === '05') {
            return 'с чистовой(темной) отделкой';
        } else if (dec === '06') {
            return 'с чистовой отделкой «Ялта»';
        } else if (dec === '07') {
            return 'с чистовой отделкой «Сочи»';
        } else if (dec === '08') {
            return 'с чистовой отделкой «Классика»';
        } else if (dec === '09') {
            return 'с чистовой отделкой «Модерн»';
        } else if (dec === '10') {
            return 'с финишной отделкой';
        } else if (dec === '12') {
            return 'с черновой отделкой без перегородок';
        } else if (dec === '13') {
            return 'некондиция';
        } else if (dec === '14') {
            return 'венеция';
        }
        return '';
    }

    public getHouseName(h: string): string {
        if (h === '11' || h === '12') {
            return 'Флокс';
        } else if (h === '13' || h === '14') {
            return 'Пион';
        } else if (h === '15' || h === '16') {
            return 'Астильба';
        } else if (h === '17' || h === '18') {
            return 'Ирис';
        } else if (h === '19') {
            return 'Сирень';
        } else if (h === '20') {
            return 'Гортензия';
        } else if (h === '21') {
            return 'Жасмин';
        }
        return '';
    }

    public removeFromFavorite(apartment: IAddressItemFlat): void {
        this.favoritesService.toFavorite(apartment);
        this.initFavoriteFlats();
    }

    public initFavoriteFlats(): void {
        const flats = this.favoritesService.favoriteFlatsString;
        if (flats) {
            const options = {
                flats
            };
            this.favoritesService.getFavoriteFlats(options)
                .subscribe((flatsData) => this.flats = flatsData,
                    (error) => {
                    console.log(error);
                    });
        } else {
            this.flats = [];
            // this.router.navigate(['/']);
        }
    }

    public sort(type: 'floor' | 'space' | 'price' | 'section') {
        this.directionSort = type !== this.sortType ? true : !this.directionSort;
        const flats = this.favoritesService.favoriteFlatsString;
        const options = {
            flats,
            sort: `${type}${this.directionSort ? '_0' : '_1'}`
        };

        this.sortType = type;

        this.favoritesService.getFavoriteFlats(options)
            .subscribe((flatsData) => this.flats = flatsData);
    }

    get pdfUrls() {
        return this.flats.map((flat) => `https://oblakadom.ru/api/pdf?id=${flat._id}`);
    }

    public flatDeclension(number, titles) {
        const cases = [2, 0, 1, 1, 1, 2];
        return number + ' ' + titles[ (number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5] ];  
    }
}
