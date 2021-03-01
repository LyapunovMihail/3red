import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IFlatWithDiscount } from '../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { Subject } from 'rxjs';

@Injectable()

export class FavoritesService {

    public favoriteEmitter = new Subject<number>();
    public favoriteFlats: IFlatWithDiscount[];

    constructor(private http: HttpClient) { }

    public getFavoriteFlats() {
        this.http.get<IFlatWithDiscount[]>('/api/favorites/get')
            .subscribe(
                (data) => {
                        this.favoriteFlats = data;
                        if (!this.favoriteFlats.length) {
                            this.favoriteFlats = JSON.parse(localStorage.getItem('favorite')) || [];
                            this.refreshFavorite(this.favoriteFlats);
                        }
                        this.setFavoriteCount();
                    },
                (err) => console.error(err)
            );
    }

    public refreshFavorite(flats) {
        this.http.post<IFlatWithDiscount[]>('/api/favorites/refresh', {flats})
            .subscribe(
                (message) => console.log('refresh: ', message),
                (err) => console.error(err)
            );
    }

    public setFavorite(flat) {
        this.http.post<IFlatWithDiscount[]>('/api/favorites/set', {flat})
            .subscribe(
                (data) => {
                        this.favoriteFlats = data;
                        localStorage.setItem('favorite', JSON.stringify(this.favoriteFlats));
                        this.setFavoriteCount();
                    },
                (err) => console.error(err)
            );
    }

    public inFavorite(flat) {
        return this.favoriteFlats.some((item) => item.article === flat.article);
    }

    public getFavoriteCount() {
        return this.favoriteEmitter.asObservable();
    }

    public setFavoriteCount() {
        return this.favoriteEmitter.next(this.favoriteFlats.length);
    }
}
