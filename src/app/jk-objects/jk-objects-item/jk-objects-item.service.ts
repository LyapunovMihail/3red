import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()

export class JkObjectsItemService {

    constructor(
        private http: HttpClient
    ) { }

    // ToDo реализовать контроллер и интерфейсы для jk-objects/object-api
    public getSnippet(objectID): Observable<any> {
        return this.http.get<any>(`/api/jk-object/object/id/${objectID}`);
    }
}
