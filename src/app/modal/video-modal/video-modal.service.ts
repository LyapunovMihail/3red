import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class VideoModalService {

    private subject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public changeVideoVisibility(state: boolean): void {
        this.subject.next(state);
    }

    public get getVideoVisibility(): Observable<boolean> {
        return this.subject.asObservable();
    }
}
