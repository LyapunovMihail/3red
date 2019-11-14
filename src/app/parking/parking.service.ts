import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IAddressItemFlat } from '../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
declare let $: any;

@Injectable()

export class ParkingService {

    constructor(private http: HttpClient) {}

    public getObjects(options): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search', { search: options });
    }

    public getConfig() {
        return this.http.get('/api/search-config');
    }

    public flatsHover(flats: IAddressItemFlat[], callbacks) {
        flats.forEach((item: IAddressItemFlat) => {
            const flat = document.querySelector(`#_${item.flat}`);
            // статус квартиры
            const status = true; // item.status === '4';
            if (flat) {
                $(flat).off('mouseenter');
                $(flat).off('mouseleave');
                $(flat).off('click');
                $(flat).on('mouseenter', () => callbacks.hover(item));
                $(flat).on('mouseleave', () => callbacks.hover(null));
                $(flat).on('click', () => callbacks.click(item));
                $(flat).addClass('flat-mod');
                $(flat).addClass(`flat-mod--${((status) ? 'available' : 'out-of-stock')}`);
            }
        });
    }

}
