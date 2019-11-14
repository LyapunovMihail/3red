import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import * as _ from 'lodash';
import { PlatformDetectService } from '../platform-detect.service';
import { IAddressItemFlat } from '../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { HttpClient } from '@angular/common/http';

export interface FavoriteFlatsInterface {
  section: string;
  flats: string[];
}

@Injectable()
export class FavoritesService {

  private _favoriteFlatsCounter: BehaviorSubject < number > = new BehaviorSubject < number > (0);

  constructor(
    private platformDetectService: PlatformDetectService,
    private http: HttpClient,
  ) {
    if (this.favoriteFlats) {
      this._favoriteFlatsCounter.next(this.favoriteFlatsAmount);
    }
  }

  get favoriteFlatsCounter(): Observable < number > {
    return this._favoriteFlatsCounter.asObservable();
  }

  public toFavorite(apartment: IAddressItemFlat): void {
    const favoriteFlats = this.favoriteFlats;

    if (!favoriteFlats) {
      localStorage.setItem('flats', JSON.stringify([{
        section: apartment.section,
        flats: [apartment.flat]
      }]));
      this._favoriteFlatsCounter.next(1);
    } else {
      const thisSectionIndex = favoriteFlats.findIndex((flatData) => flatData.section === apartment.section.toString());

      if (thisSectionIndex > -1) {
        const thisFlatIndex = favoriteFlats[thisSectionIndex].flats.findIndex((flat) => flat === apartment.flat.toString());

        if (thisFlatIndex > -1) {
          favoriteFlats[thisSectionIndex].flats.splice(thisFlatIndex, 1);

          if (favoriteFlats[thisSectionIndex].flats.length === 0) {
            favoriteFlats.splice(thisSectionIndex, 1);
          }
        } else {
          favoriteFlats[thisSectionIndex].flats.push(apartment.flat.toString());
        }
      } else {
        favoriteFlats.push({
          section: apartment.section.toString(),
          flats: [apartment.flat.toString()]
        });
      }

      if (favoriteFlats.length > 0) {
        localStorage.setItem('flats', JSON.stringify(favoriteFlats));
        this._favoriteFlatsCounter.next(this.favoriteFlatsAmount);
      } else {
        localStorage.removeItem('flats');
        this._favoriteFlatsCounter.next(0);
      }
    }
  }

  public inFavorite(apartment: IAddressItemFlat): boolean {
    const favoriteFlats = this.favoriteFlats;

    if (!favoriteFlats) {
      return false;
    } else {
      const thisSectionIndex = favoriteFlats.findIndex((flatData) => flatData.section === apartment.section.toString());

      if (thisSectionIndex > -1) {
        const thisFlatIndex = favoriteFlats[thisSectionIndex].flats.findIndex((flat) => flat === apartment.flat.toString());

        if (thisFlatIndex > -1) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  }

  public getFavoriteFlats(options): Observable<IAddressItemFlat[]> {
    return this.http.post<IAddressItemFlat[]>('/api/search', { search: options });
  }

  get favoriteFlatsString(): string {
    const favoriteFlats = this.favoriteFlats;

    if (!favoriteFlats) {
      return;
    }

    return favoriteFlats.map((flat: FavoriteFlatsInterface) => `s${flat.section}-${flat.flats.join(',')}`).join('');
  }

  public sendPdf(options: {email: string, text: string}): Observable<{success: boolean}> {
    return this.http.post<{success: boolean}>('/api/pdf-sender', options);
  }

  private get favoriteFlatsAmount(): number {
    const favoriteFlats = this.favoriteFlats;
    return _.flatMap(
      _.map(favoriteFlats, 'flats')
    ).length;
  }

  private get favoriteFlats(): FavoriteFlatsInterface[] {
    if (!this.platformDetectService.isBrowser) {
      return;
    }
    return JSON.parse(localStorage.getItem('flats'));
  }

}
