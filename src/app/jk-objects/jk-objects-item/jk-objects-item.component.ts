import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
import { EventsService } from '../../commons/events.service';

@Component({
    selector: 'app-jk-objects-item',
    templateUrl: './jk-objects-item.component.html',
    styleUrls: ['./jk-objects-item.component.scss']
})
export class JkObjectsItemComponent implements OnInit, AfterViewInit, OnDestroy {

    public authorizationEvent;
    public isAuthorizated = false;
    public intervalTimer;

    @ViewChild('container')
    public container: ElementRef;

    constructor(
        private authorization: AuthorizationObserverService,
        private eventsService: EventsService
    ) { }

    ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });
    }

    ngAfterViewInit() {
        this.eventsService.checkHeightResize(this, this.container);
    }

    ngOnDestroy() {
        this.authorizationEvent.unsubscribe();
        clearInterval(this.intervalTimer);
    }

}
