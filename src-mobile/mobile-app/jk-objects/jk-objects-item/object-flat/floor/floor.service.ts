import { IAddressItemFlat, IFlatWithDiscount } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IObjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
declare let $: any;

@Injectable()

export class FloorService {

    constructor(private http: HttpClient) {}

    private flats: IFlatWithDiscount[];

    public getFlats(options): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search/object', { search: options });
    }

    public getFlatsDataByObjectId(id): Observable<{jk: IObjectSnippet, housesBtnList, floorCount, config}> {
        return this.http.get<{jk: IObjectSnippet, housesBtnList, floorCount, config}>(`/api/search/object-data/${id}`);
    }

    public flatsHover(flats: IFlatWithDiscount[], callbacks) {
        this.resetPlanFlats();
        this.flats = flats;
        flats.forEach((item: IFlatWithDiscount, i) => {
            const flat = document.querySelector(`#_${item.flat}`);
            if (flat) {
                $(flat).off('mouseenter');
                $(flat).off('mouseleave');
                $(flat).off('click');
                $(flat).on('mouseenter', () => callbacks.hover(item));
                $(flat).on('mouseleave', () => callbacks.hover(null));
                $(flat).on('click', () => callbacks.click(i));
                $(flat).addClass('flat-mod');
                $(flat).addClass(`flat-mod--${((item.status === '4') ? 'free' : 'out-of-stock')}`);
            }
        });
    }

    public resetPlanFlats() {
        if (!this.flats) { return; }
        this.flats.forEach((item: IFlatWithDiscount) => {
            const flat = document.querySelector(`#_${item.flat}`);
            if (flat) {
                $(flat).off('mouseenter');
                $(flat).off('mouseleave');
                $(flat).off('click');
                $(flat).removeClass('flat-mod');
                $(flat).removeClass(`flat-mod--${((item.status === '4') ? 'free' : 'out-of-stock')}`);
            }
        });
    }

}
