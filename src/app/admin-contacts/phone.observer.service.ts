import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable( )

export class PhoneObserverService {

    private subject = new BehaviorSubject<string>(null);

    setPhone(val: string) {
        this.subject.next(val);
    }

    getPhone(): Observable<string> {
        return this.subject.asObservable( );
    }
}
