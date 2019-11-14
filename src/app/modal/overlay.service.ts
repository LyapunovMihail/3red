import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class OverlayService {

    private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public changeOverlayVisibility(state: boolean): void {
        this.subject.next(state);
    }

    public get getOverlayVisibility(): Observable<boolean> {
        return this.subject.asObservable();
    }
}
