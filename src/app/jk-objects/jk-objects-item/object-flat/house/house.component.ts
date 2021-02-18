import { IFlatWithDiscount } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { FlatsDiscountService } from '../../../../commons/flats-discount.service';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';
import { FloorCount } from '../floor/floor-count';
import { IFlatBubbleCoordinates } from './flat-bubble/flat-bubble.component';
import { HouseService } from './house.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { PlatformDetectService } from '../../../../platform-detect.service';
import { ObjectFlatsService } from '../object-flats.service';
import { IObjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { HttpClient } from '@angular/common/http';

interface IFLatDisabled extends IFlatWithDiscount {
    disabled: boolean;
}

@Component({
    selector: 'app-flats-house-page',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./house.component.scss', '../object-flats.component.scss'],
    templateUrl: './house.component.html',
    providers: [
        WindowScrollLocker,
        HouseService
    ]
})

export class HouseComponent implements OnInit, OnDestroy, AfterViewInit {

    public jk: IObjectSnippet;
    // public houseNumber: string;
    public chess: IFLatDisabled[][][][];
    public houseNumbers: string[];
    public bubbleData: IFlatWithDiscount;
    public showBubble = false;
    public routerEvent;
    public showApartmentWindow = false;
    public selectedFlatIndex: number;
    public floorFlats: IFlatWithDiscount[];
    public floorCount = FloorCount;
    public searchFlats: IFlatWithDiscount[];
    // переменные для реализации скролла секций
    public scroll = 0;
    public chessMaxScroll: number;
    public scrollStep = 300;
    public lastScrollStep: number;
    public showChess = true;
    public chessHeight: number;

    public isStorerooms = false;
    public isParking = false;

    public bubbleCoords: IFlatBubbleCoordinates = {
        left: 100,
        top: 100
    };

    @ViewChild('chessChild', { static: false })
    public chessChild: ElementRef;
    @ViewChild('chessParent', { static: false })
    public chessParent: ElementRef;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public service: HouseService,
        private flatsDiscountService: FlatsDiscountService,
        private objectFlatsService: ObjectFlatsService,
        public windowScrollLocker: WindowScrollLocker,
        private platform: PlatformDetectService,
        private ref: ChangeDetectorRef,
        public http: HttpClient
    ) {
    }

    public ngOnInit() {
        this.service.getFlatsDataByObjectId(this.objectFlatsService.getId()).subscribe(
            (data) => {
                this.objectFlatsService.setData(data);
                this.jk = data.jk;
                this.floorCount = data.floorCount;
                this.chess = data.chess;
                this.routerEvent = this.routerChange();
                console.log('this.chess: ', this.chess);

                this.service.getFlats({ // запрос кладовых
                    mod: this.jk.mod,
                    type: 'КЛ'
                }).subscribe(
                    (storerooms) => {
                        this.isStorerooms = storerooms.length > 0;
                    },
                    (err) => console.error(err)
                );

                this.service.getFlats({ // запрос машиномест
                    mod: this.jk.mod,
                    type: 'ММ'
                }).subscribe(
                    (parking) => {
                        this.isParking = parking.length > 0;
                    },
                    (err) => console.error(err)
                );
            },
            (err) => {
                console.log(err);
                this.router.navigate(['/error-404'], {
                    skipLocationChange: true
                });
            }
        );
    }

    public routerChange() {
        return this.activatedRoute.params.subscribe((params) => {
            setTimeout(() => {
                this.houseNumbers = params.house === 'all' ? Object.keys(this.chess) : params.house.split(',');
                this.houseNumbers.forEach((houseNumber) => {
                    if (!this.floorCount[houseNumber]) {
                        this.router.navigate(['/error-404'], {
                            skipLocationChange: true
                        });
                    }
                });

                if (this.searchFlats) {
                    setTimeout(() => {
                        this.searchFlatsSelection();
                    }, 250);
                }
                if (this.showChess) {
                    this.scrollCalculate();
                }

            }, 200);
        });
    }

    public searchFlatsSelection() {
        this.houseNumbers.forEach((house) => {
            this.chess[house].forEach((section: IFLatDisabled[][]) => {
                if (!section) { return; }
                section.forEach((floor: IFLatDisabled[]) => {
                    floor.forEach((flat: IFLatDisabled) => {
                        flat.disabled = true;
                        flat.discount = this.flatsDiscountService.getDiscount(flat);
                        this.searchFlats.forEach((searchFlat: IFlatWithDiscount) => {
                            if ((searchFlat.house === flat.house
                                && searchFlat.section === flat.section
                                && searchFlat.flat === flat.flat)
                                || flat.status === '8') {
                                flat.disabled = false;
                            }
                        });
                    });
                });
            });
        });
        this.ref.detectChanges();
    }

    public openApartmentModal(index, floorFlats) {
        this.selectedFlatIndex = index;
        this.floorFlats = floorFlats;
        this.windowScrollLocker.block();
        this.showApartmentWindow = true;
    }

    public showFlatBubble(event, flat, sectionContainer) {
        const distanceToBottom = sectionContainer.clientHeight - (event.target.offsetTop);
        const bubbleHeight = flat.discount ? 312 : 288;
        this.bubbleCoords.top = (distanceToBottom > bubbleHeight) ? event.target.getBoundingClientRect().top : event.target.getBoundingClientRect().top - bubbleHeight + 89;
        this.bubbleCoords.left = event.target.getBoundingClientRect().left + 40;
        this.bubbleData = flat;
        this.showBubble = true;
    }

    public ngAfterViewInit() {
        if (this.showChess) {
            this.scrollCalculate();
        }
    }

    public scrollCalculate() {
        setTimeout(() => {
            this.chessHeight = this.chessParent.nativeElement.clientHeight;
            this.scroll = 0;
            this.chessMaxScroll = this.chessChild.nativeElement.clientWidth - this.chessParent.nativeElement.clientWidth;
            if (this.chessMaxScroll > 0 ) {
                this.lastScrollStep = this.chessMaxScroll % this.scrollStep;
            } else {
                this.chessMaxScroll = 0;
            }
        }, 600); // даём время отрендериться шаблону чтобы оценить ширину блока с секциями
    }

    public scrollPrev() {
        this.scroll -= this.scrollStep;
        if (this.scroll < 0) {
            this.scroll = 0;
        }
    }

    public scrollNext() {
        if (this.chessMaxScroll - this.scroll === this.lastScrollStep) {
            this.scroll += this.lastScrollStep;
        } else {
            this.scroll += this.scrollStep;
        }
    }

    public ngOnDestroy() {
        // отписка от событий роута
        if (this.routerEvent) {
            this.routerEvent.unsubscribe();
        }
    }
}
