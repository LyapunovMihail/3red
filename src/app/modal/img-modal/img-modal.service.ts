import {Observable, Subject} from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ImgModalService {

    private subject: Subject<[boolean, string]> = new Subject<[boolean, string]>();

    public changeImgVisibility(state: boolean, url: string): void {
        this.subject.next([state, url]);
    }

    public get getImgVisibility(): Observable<[boolean, string]> {
        return this.subject.asObservable();
    }
}
