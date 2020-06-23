import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs';

@Injectable()

export class EventsService {

    private subjectResize = new Subject<any>();

    constructor() {
    }

    public getResizeEventEmitter(): Observable<any> {
        return this.subjectResize;
    }

    public setResizeEvent() {
        this.subjectResize.next();
    }

    public checkHeightResize(that, container) {
        let prevContainerHeight = container.nativeElement.clientHeight;
        that.intervalTimer = setInterval(() => {
            if (prevContainerHeight !== container.nativeElement.clientHeight) {
                this.setResizeEvent();
                prevContainerHeight = container.nativeElement.clientHeight;
            }

        }, 400);
    }

}
