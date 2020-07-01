import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { EventsService } from '../../commons/events.service';
import { ActivatedRoute, Router } from '@angular/router';
import { JkObjectsListService } from '../jk-objects-list/jk-objects-list.service';
import { IObjectSnippet } from '../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { JkService } from '../../commons/jk.service';

@Component({
    selector: 'app-jk-objects-item',
    templateUrl: './jk-objects-item.component.html',
    styleUrls: ['./jk-objects-item.component.scss'],
    providers: [
        JkObjectsListService
    ]
})
export class JkObjectsItemComponent implements OnInit, AfterViewInit {

    public objectId: string;
    public jk: IObjectSnippet;

    @ViewChild('container')
    public container: ElementRef;

    constructor(
        private router: Router,
        private eventsService: EventsService,
        private activatedRoute: ActivatedRoute,
        private jkObjectsItemService: JkObjectsListService,
        private jkService: JkService
    ) { }

    ngOnInit() {
        this.objectId = this.activatedRoute.snapshot.params.id;
        this.jkService.setJkId(this.objectId); // Для хедера
        this.getJkObject();
    }

    ngAfterViewInit() {
        this.eventsService.checkHeightResize(this, this.container);
    }

    public getJkObject() {
        this.jkObjectsItemService.getSnippets(this.objectId)
            .subscribe(
                (data) => this.jk = data[0],
                (err) => {
                    console.error(err);
                    this.router.navigate(['/error-404'], { skipLocationChange: true });
                }
            );
    }
}
