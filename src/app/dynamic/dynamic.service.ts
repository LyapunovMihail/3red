import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()

export class DynamicService {

    constructor( private http: HttpClient ) {}

    public getObjects(): Observable<any> {
        return this.http.get('/api/dynamic');
    }

}
