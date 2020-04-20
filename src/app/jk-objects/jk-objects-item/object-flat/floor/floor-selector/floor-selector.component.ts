import { Router } from '@angular/router';
import { Component, Input, Output, EventEmitter, OnInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { IObjectSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-floor-selector',
    templateUrl: './floor-selector.component.html',
    styleUrls: ['./floor-selector.component.scss']
})

export class FloorSelectorComponent implements OnInit, OnDestroy, OnChanges {

    @Input() public jk: IObjectSnippet;
    @Input() public houseNumber;
    @Input() public sectionNumber;
    @Input() public floorNumber;
    @Input() public floorSelector;

    @Output() public svgClick: EventEmitter<any> = new EventEmitter();

    public selectorShift = 1;
    public selectorIndex: number;

    private selectedFloor$: Subject<number> = new Subject<number>();
    private _ngUnsubscribe: Subject<any> = new Subject();

    constructor(
        public router: Router
    ) { }

    public ngOnInit() {
        this.evaluateSelectorShift();

        this.selectedFloor$
        .pipe(debounceTime(300), takeUntil(this._ngUnsubscribe))
        .subscribe((floorIndex) => {
            this.router.navigate([`/objects/list/${this.jk._id}/flats/house/${this.houseNumber}/section/${this.sectionNumber}/floor/${this.floorSelector[floorIndex]}`]);
        });
    }



    public ngOnChanges(changes: SimpleChanges) {
        if ('floorSelector' in changes) {
            this.evaluateSelectorShift();
        }
    }

    private evaluateSelectorShift() {
        this.selectorShift = Math.abs(this.floorSelector.length - this.floorSelector[0]);
        this.selectorIndex = this.floorSelector.indexOf(this.floorNumber);
    }

    public ngOnDestroy() {
        this._ngUnsubscribe.next();
        this._ngUnsubscribe.complete();
    }

    public floorSelect(floorIndex) {
        console.log('floorIndex: ', floorIndex);
        if (this.floorSelector.length < floorIndex + 1 || floorIndex < 0) {
            return;
        }
        this.selectorIndex = floorIndex;
        this.selectedFloor$.next(floorIndex);
    }

}
