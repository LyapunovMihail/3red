import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';
import { fromEvent } from 'rxjs';

@Injectable()

export class WindowEventsService {

    private subjectScroll = new Subject<any>();
    private subjectWheel = new Subject<any>();
    private subjectResize = new Subject<any>();
    private subjectClick = new Subject<any>();

    constructor() {
        this.eventsInitListeners();
    }

    public get onScroll(): Observable<any> {
        return this.subjectScroll.asObservable();
    }

    public get onWheel(): Observable<any> {
        return this.subjectWheel.asObservable();
    }

    public get onResize(): Observable<any> {
        return this.subjectResize.asObservable();
    }

    public get onClick(): Observable<any> {
        return this.subjectClick.asObservable();
    }

    private eventsInitListeners() {
        fromEvent(window, 'scroll').subscribe((event) => {
            this.subjectScroll.next(event);
        });
        fromEvent(window, 'wheel').subscribe((event) => {
            this.subjectWheel.next(event);
        });
        fromEvent(window, 'resize').subscribe((event) => {
            this.subjectResize.next(event);
        });
        fromEvent(window, 'click').subscribe((event) => {
            this.subjectClick.next(event);
        });
    }

}
