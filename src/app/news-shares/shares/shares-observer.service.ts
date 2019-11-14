import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class SharesObserverService {

    private subject = new BehaviorSubject<number>(1);

    public changePageCount(count) {
        this.subject.next(count);
    }

    public get getPageCount(): Observable<number> {
        return this.subject.asObservable();
    }
}
