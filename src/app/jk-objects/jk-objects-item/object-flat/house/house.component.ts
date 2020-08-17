import { IFlatWithDiscount } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { FlatsDiscountService } from '../../../../commons/flats-discount.service';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';
import { FloorCount } from '../floor/floor-count';
import { IFlatBubbleCoordinates } from './flat-bubble/flat-bubble.component';
import { HouseService } from './house.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation, OnDestroy, AfterViewInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { PlatformDetectService } from '../../../../platform-detect.service';
import { IAddressItemFlat } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.config';
import { ObjectFlatsService } from '../object-flats.service';
import { IObjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';
import { Observable } from 'rxjs';
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
    public housesData: IFLatDisabled[][][][] = [];
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

    @ViewChild('chess')
    public chess: ElementRef;
    @ViewChild('chessContainer')
    public chessContainer: ElementRef;

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
                // this.setFloorCount();
                this.routerEvent = this.routerChange();
                console.log('this.floorCount: ', this.floorCount);
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
    private getFloorSvg(url): Observable<string> {
        return this.http.get<string>(url, { responseType: 'text' as 'json' });
    }

    private setFloorCount() { // перепроектирую структуру домов на основе имеющихся схем квартир, а не квартир в бд (для шахматки)
        for (let i = 0; i < 20; i++) {
            for (let j = 0; j < 20; j++) {
                for (let k = 0; k < 50; k++) {
                    // this.getFloorSvg(`/assets/floor-plans/jk_${this.jk.mod}/house_${i}/section_${j}/floor_${k}/${k}floor_${1}flat.svg`);
                    // for (let f = 0; f < 20; f++) {
                    //     this.getFloorSvg(`/assets/floor-plans/jk_${this.jk.mod}/house_${i}/section_${j}/floor_${k}/${k}floor_${f}flat.svg`).subscribe(
                    //         (data: string) => {
                    //             // let floorSvg = data;
                    //             // floorSvg = floorSvg.slice(1, 4) !== 'svg' ? '' : floorSvg;
                    //             // if (f === 20) {
                    //             //     console.log('floorSvg: ', floorSvg);
                    //             // }
                    //             // if (!this.floorCount[i][j][k]) {
                    //             //     this.floorCount[i][j][k] = [];
                    //             // }
                    //             // this.floorCount[i][j][k].push(f);
                    //             // console.log('');
                    //             },
                    //         (err) => {
                    //             console.log('');
                    //         });
                    // }
                }
            }
        }
    }

    public routerChange() {
        return this.activatedRoute.params.subscribe((params) => {
            setTimeout(() => {
                // тут сделать цикл по params.house.forEach((item) => this.floorCount[item]);
                this.housesData = [];
                const houseNumbers = params.house === 'all' ? Object.keys(this.floorCount) : params.house.split(',');
                houseNumbers.forEach((houseNumber, i) => {
                    // if (this.floorCount[item]) {
                    //
                    // }
                    if (this.floorCount[houseNumber]) {
                        // this.houseNumber = house;
                        const houseData = [];
                        this.housesData[i] = houseData;
                        const sectionNumbers = Object.keys(this.floorCount[houseNumber]); // создаём массив из номеров секций по выбранному дому.
                        if (this.platform.isBrowser) {
                            // получение квартир для нужных секций
                            sectionNumbers.forEach((sectionNumber) => {
                                this.getFlats(sectionNumber, houseNumber).subscribe(
                                    (flats) => {
                                        this.buildSectionData(flats, houseNumber, sectionNumber, houseData);
                                    },
                                    (err) => console.log(err)
                                );
                            });
                        }
                    } else if (houseNumber === 'all') {
                        // this.showChess = false;
                        // // this.houseNumber = null;
                    } else {
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

    private buildSectionData(flats, houseNumber, sectionNumber, houseData) {
        let sectionData = flats.reduce((section: IFLatDisabled[][], flat: IAddressItemFlat) => {
            if (!section[flat.floor]) {
                section[flat.floor] = [];
            }

            // Object.keys(this.floorCount[]);
            section[flat.floor].push({...flat, discount: this.flatsDiscountService.getDiscount(flat), disabled: true});
            return section;
        }, []);

        let sectionFloors = sectionData.length; // ToDo Временное решение
        switch (this.jk.mod) {
            case 'МКВ':
                sectionFloors = 6;
                break;
            case 'МАЙ':
                sectionFloors = 4;
                break;
            case 'АИБ':
                sectionFloors = 5;
                break;
        }
        for (let i = 1; i < sectionFloors; i++) {
            if (sectionData[i] == null) {
                sectionData[i] = [];
            } else {
                sectionData[i].sort();
            }
        }

        sectionData.reverse();

        const lengths = [];
        sectionData.forEach((floor) => lengths.push(floor.length));

        let floorMaxLength = this.jk.mod === 'ОБ' || this.jk.mod === 'НК' || this.jk.mod === 'МКВ' ? 8 : Math.max(...lengths); // ToDo Временное решение
        switch (this.jk.mod) {
            case 'НК':
                floorMaxLength = 7;
                break;
            case 'ОБ':
                floorMaxLength = 8;
                break;
            case 'МКВ':
                floorMaxLength = 7;
                break;
            case 'МАЙ':
                floorMaxLength = 4;
                break;
            case 'АИБ':
                floorMaxLength = 9;
                break;
        }

        sectionData.forEach((floor, j) => {
            const floorLength = floor.length;
            for (let i = 0; i < (floorMaxLength - floorLength); i++) {
               floor.push({status : '-1', house: houseNumber, section: sectionNumber, floor: sectionData.length - 1 - j});
            }
        });
        houseData[sectionNumber - 1] = sectionData;
        // console.log('this.sectionsData: ', houseData);
    }

    public searchFlatsSelection() {
        this.housesData.forEach((house) => {
            house.forEach((section: IFLatDisabled[][]) => {
                section.forEach((floor: IFLatDisabled[]) => {
                    floor.forEach((flat: IFLatDisabled) => {
                        flat.disabled = true;
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
        console.log('this.housesData: ', this.housesData);
        this.ref.detectChanges();
    }

    public getFlats(section, house) {
        return this.service.getFlats({
            mod: this.jk.mod,
            houses: house,
            sections: section,
            type: 'КВ,АП'
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
        if (this.showChess) {
            this.scrollCalculate();
        }
    }

    public scrollCalculate() {
        setTimeout(() => {
            this.chessHeight = this.chessContainer.nativeElement.clientHeight;
            this.scroll = 0;
            this.chessMaxScroll = this.chess.nativeElement.clientWidth - this.chessContainer.nativeElement.clientWidth;
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
