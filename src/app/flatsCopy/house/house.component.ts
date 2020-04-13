import { IFlatWithDiscount } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { FlatsDiscountService } from '../../commons/flats-discount.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';
import { FloorCount } from '../floor/floor-count';
import { IFlatBubbleCoordinates } from './flat-bubble/flat-bubble.component';
import { HouseService } from './house.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { PlatformDetectService } from './../../platform-detect.service';

interface IFLatDisabled extends IFlatWithDiscount {
    disabled: boolean;
}

@Component({
    selector: 'app-flats-house-page',
    encapsulation: ViewEncapsulation.None,
    styleUrls: ['./house.component.scss', '../flats.component.scss'],
    templateUrl: './house.component.html',
    providers: [
        WindowScrollLocker,
        HouseService
    ]
})

export class HouseComponent implements OnInit, OnDestroy, AfterViewInit {

    public houseNumber: string;
    public flatsOnFloor: number;
    public sectionNumbers: string[] = [];
    public sectionsData: IFLatDisabled[][][] = [];
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
    public scrollStep = 340;
    public lastScrollStep: number;

    public showChess = true;

    public bubbleCoords: IFlatBubbleCoordinates = {
        left: 100,
        top: 100
    };

    @ViewChild('chess')
    public chess: ElementRef;
    @ViewChild('chessContainer')
    public chessContainer: ElementRef;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public service: HouseService,
        private flatsDiscountService: FlatsDiscountService,
        public windowScrollLocker: WindowScrollLocker,
        private platform: PlatformDetectService
    ) {
    }

    public ngOnInit() {
        this.routerEvent = this.routerChange();

    }

    public routerChange() {

        return this.activatedRoute.params.subscribe((params) => {
            setTimeout(() => {
                if (this.floorCount[params.house]) {
                    this.showChess = true;
                    this.houseNumber = params.house;
                    this.flatsOnFloor = this.houseNumber === '1a' || this.houseNumber === '1b' ? 8 : 7;
                    this.sectionsData = [];
                    this.sectionNumbers = Object.keys(this.floorCount[this.houseNumber]); // создаём массив из номеров секций по выбранному дому.
                    if (this.platform.isBrowser) {
                        // получение квартир для нужных секций
                        this.sectionNumbers.forEach((sectionNumber) => {
                            this.getFlats(sectionNumber).subscribe(
                                (flats) => {
                                    this.buildSectionData(flats, sectionNumber);
                                },
                                (err) => console.log(err)
                            );
                            if (this.searchFlats) {
                                setTimeout(() => {
                                    this.searchFlatsSelection();
                                }, 100);
                            }
                            this.scrollCalculate();
                        });
                    }
                } else if (params.house === '1a,1b,2a,2b') {
                    this.showChess = false;
                } else {
                    this.router.navigate(['/error-404'], {
                        skipLocationChange: true
                    });
                }
            }, 100);
        });
    }

    private buildSectionData(flats, sectionNumber) {
        const sectionDataWithMockFlats = [];
        for (let i = 0; i < 5; i++) {
            sectionDataWithMockFlats[i] = [];
            const floorFlats = flats.filter((flat) => flat.floor === 5 - i);
            sectionDataWithMockFlats[i].push(...floorFlats);
            if (floorFlats.length < this.flatsOnFloor) {
                for (let j = floorFlats.length; j < this.flatsOnFloor; j++) {
                    sectionDataWithMockFlats[i].push({status: '-1', section: sectionNumber, floor: 5 - i});
                }
            }
        }

        sectionDataWithMockFlats.map((floor: IFLatDisabled[]) => {
            floor.sort();
        });

        this.sectionsData[sectionNumber - 1] = sectionDataWithMockFlats;
    }

    public searchFlatsSelection() {
        this.sectionsData.forEach((section: IFLatDisabled[][]) => {
            section.forEach((floor: IFLatDisabled[]) => {
                floor.forEach((flat: IFLatDisabled) => {
                    flat.disabled = true;
                    this.searchFlats.forEach((searchFlat: IFlatWithDiscount) => {
                        if ((searchFlat.house === this.houseNumber
                            && searchFlat.section === flat.section
                            && searchFlat.flat === flat.flat)
                            || flat.status === '8') {
                            flat.disabled = false;
                        }
                    });
                });
            });
        });
    }

    public getFlats(section) {
        return this.service.getObjects({
            houses: this.houseNumber,
            sections: section
        });
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
        this.scrollCalculate();
    }

    public scrollCalculate() {
        setTimeout(() => {
            this.scroll = 0;
            this.chessMaxScroll = this.chess.nativeElement.clientWidth - this.chessContainer.nativeElement.clientWidth;
            if (this.chessMaxScroll > 0 ) {
                this.lastScrollStep = this.chessMaxScroll % this.scrollStep;
            } else {
                this.chessMaxScroll = 0;
            }
        }, 400); // даём время отрендериться шаблону чтобы оценить ширину блока с секциями
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
        this.routerEvent.unsubscribe();
    }
}
