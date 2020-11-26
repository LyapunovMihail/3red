import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Injectable()

export class SearchService {

    public outputFlatsChanged: Subject<any> = new Subject();
    public loadingIndicator: Subject<boolean> = new Subject();

    constructor(private http: HttpClient) {}

    public getFlats(options): Observable<IAddressItemFlat[]> {
        return this.http.post<IAddressItemFlat[]>('/api/search', { search: options });
    }

    public getObjects(id?): Observable<IObjectSnippet[]> {
        return this.http.get<IObjectSnippet[]>(`/api/jk-object/object/id/${id}`);
    }

    public getFlatsMultiple(options): Observable<IAddressItemFlat[]>  {
        return this.http.post<IAddressItemFlat[]>('/api/search/common', { search: options });
    }

    public getFlatsData(options): Observable<{modsBtnList, housesBtnList, config}>  {
        console.log('options: ', options);
        return this.http.get<{modsBtnList, housesBtnList, config}>('/api/search/common-data', {params: options});
    }

    public getOutputFlatsChanged() {
        return this.outputFlatsChanged;
    }

    public setOutputFlatsChanged(flats, showMore?) {
        this.outputFlatsChanged.next({flats, showMore});
    }

    public getLoadingIndicator() {
        return this.loadingIndicator;
    }

    public setLoadingIndicator(isLoading) {
        this.loadingIndicator.next(isLoading);
    }

    public sortFlats(sort, searchFlats) {
        const name = sort.split('_')[0];
        const value = sort.split('_')[1];

        if (name !== 'delivery') {
            searchFlats.sort((flat, flat2) => {
                if (value === '1') {
                    return flat[name] - flat2[name];
                } else {
                    return flat2[name] - flat[name];
                }
            });
        } else {
            searchFlats.sort((flat, flat2) => {
                if (value === '1') {
                    if (new Date(flat[name]) > new Date(flat2[name])) {
                        return 1;
                    } else if ( new Date(flat[name]) < new Date(flat2[name])) {
                        return -1;
                    } else {
                        return 0;
                    }
                } else {
                    if (new Date(flat[name]) > new Date(flat2[name])) {
                        return -1;
                    } else if ( new Date(flat[name]) < new Date(flat2[name])) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
            });
        }
    }
}
