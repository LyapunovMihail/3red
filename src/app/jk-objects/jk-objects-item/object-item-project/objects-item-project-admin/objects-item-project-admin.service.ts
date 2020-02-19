import { adminHeaders } from '../../../../commons/admin-headers.utilit';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { IObjectProjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/project-api/objects-project.interfaces';

@Injectable()

export class ObjectsItemProjectAdminService {

    public subject = new BehaviorSubject<number>(0);

    constructor(
        private http: HttpClient
    ) { }

    public getSnippetById(objectID): Observable<IObjectProjectSnippet> {
        return this.http.get<IObjectProjectSnippet>(`/api/jk-object/project/id/${objectID}`);
    }

    public setSnippetData(data): Observable<IObjectProjectSnippet> {
        return this.http.post<IObjectProjectSnippet>('/api/admin/jk-object/project/create-update', data , adminHeaders());
    }

    public convertIndicatorsValues(form) { // перестраиваем индикаторы в более удобную структуру для хранения в бд
        form.value.indicators = form.value.indicators.map((item) => {
            const key = Object.keys(item)[0];
            const val = item[key];
            return {text: key, value: val};
        }).filter((item) => item.value !== '');
    }
}
