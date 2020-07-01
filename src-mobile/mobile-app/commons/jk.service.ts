import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()

export class JkService {

    private subject = new Subject<any>();

    constructor() {
    }

    public getJkId(): Observable<any> {
        return this.subject;
    }

    public setJkId(id) {
        this.subject.next(id);
    }

}
