import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IObjectFlatSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/flat-api/objects-flat.interfaces';
import { IAddressItemFlat } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Injectable()

export class PlanService {

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectFlatSnippet> {
        return this.http.get<IObjectFlatSnippet>(`/api/jk-object/flat/id/${objectID}`);
    }

    public setSnippetData(data): Observable<IObjectFlatSnippet> {
        return this.http.post<IObjectFlatSnippet>('/api/admin/jk-object/flat/create-update', data , adminHeaders());
    }

    public getFlats(options): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search/object', { search: options });
    }

    public setTooltipStyle(active, parent, tooltip, link) {

        const tooltipElem = tooltip;
        const parentWidth = parent.clientWidth;
        const parentOffsetTop = parent.getBoundingClientRect().top;
        const tooltipOffset = link.getBoundingClientRect().top;
        const tooltipOffsetLeft = link.getBoundingClientRect().left;
        const styles = { 'opacity': '1', 'z-index': '1' };

        if (active) {
            if (parentOffsetTop > (tooltipOffset - tooltipElem.clientHeight)) {
                if (parentWidth < (tooltipOffsetLeft + tooltipElem.clientWidth)) {
                    return {'top': 'calc(100% + 8px)', 'bottom': 'auto', 'right': '0', 'left': 'auto', ...styles};
                }
                if ((tooltipOffsetLeft - tooltipElem.clientWidth) < 0) {
                    return {'top': 'calc(100% + 8px)', 'bottom': 'auto', 'left': '0', ...styles};
                }
                return {'top': 'calc(100% + 8px)', 'bottom': 'auto', ...styles};

            } else {
                return {'bottom': 'calc(100% + 8px)', 'top': 'auto', ...styles};
            }
        } else {
            if (parentOffsetTop > (tooltipOffset - tooltipElem.clientHeight)) {
                if (parentWidth < (tooltipOffsetLeft + tooltipElem.clientWidth)) {
                    return {'top': '100%', 'bottom': 'auto', 'right': '0', 'left': 'auto'};
                }
                if ((tooltipOffsetLeft - tooltipElem.clientWidth) < 0) {
                    return {'top': '100%', 'bottom': 'auto', 'left': '0'};
                }
                return {'top': '100%', 'bottom': 'auto'};
            } else {
                if (parentWidth < (tooltipOffsetLeft + tooltipElem.clientWidth)) {
                    return {'bottom': '100%', 'top': 'auto', 'right': '0', 'left': 'auto'};
                }
                if ((tooltipOffsetLeft - tooltipElem.clientWidth) < 0) {
                    return {'bottom': '100%', 'top': 'auto', 'left': '0'};
                }
                return {'bottom': '100%', 'top': 'auto'};
            }
        }
    }
}
