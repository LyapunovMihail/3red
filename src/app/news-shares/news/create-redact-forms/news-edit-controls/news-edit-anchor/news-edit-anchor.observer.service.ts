import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { fromEvent } from 'rxjs';

@Injectable()

export class NewsEditAnchorService {

    public textAreaValueChange: Subject<any> = new Subject();
    constructor() {
    }

    public onValueChange(): Observable<any> {
        return this.textAreaValueChange.asObservable();
    }

}
