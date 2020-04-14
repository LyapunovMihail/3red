import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthorizationObserverService } from '../../authorization/authorization.observer.service';
import { EventsService } from '../../commons/events.service';
import { ActivatedRoute } from '@angular/router';
import { JkObjectsListService } from '../jk-objects-list/jk-objects-list.service';

@Component({
    selector: 'app-jk-objects-item',
    templateUrl: './jk-objects-item.component.html',
    styleUrls: ['./jk-objects-item.component.scss'],
    providers: [
        JkObjectsListService
    ]
})
export class JkObjectsItemComponent implements OnInit, AfterViewInit, OnDestroy {

    public authorizationEvent;
    public isAuthorizated = false;
    public intervalTimer;

    public objectId: string;
    public jkObject: any;

    @ViewChild('container')
    public container: ElementRef;

    constructor(
        private authorization: AuthorizationObserverService,
        private eventsService: EventsService,
        private activatedRoute: ActivatedRoute,
        private jkObjectsItemService: JkObjectsListService
    ) { }

    ngOnInit() {
        this.authorizationEvent = this.authorization.getAuthorization().subscribe( (val) => {
            this.isAuthorizated = val;
        });
        this.objectId = this.activatedRoute.snapshot.params.id;
        this.getJkObject();
    }

    ngAfterViewInit() {
        this.eventsService.checkHeightResize(this, this.container);
    }

    ngOnDestroy() {
        this.authorizationEvent.unsubscribe();
        clearInterval(this.intervalTimer);
    }

    // ToDo реализовать контроллер и интерфейсы для jk-objects/object-api
    public getJkObject() {
        this.jkObjectsItemService.getSnippets(this.objectId)
            .subscribe(
                (data) => {
                    this.jkObject = data[0];
                    console.log('Этот ЖК ->', data[0]);
                },
                (err) => {console.error(err); this.jkObject = { name: 'Сердце Ярославля', objectId: this.objectId }; console.log('this.jkObject: ', this.jkObject); }
            );
    }
}
