import { IAddressItemFlat, IFlatWithDiscount } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { FlatsDiscountService } from '../../../../commons/flats-discount.service';
import { WindowScrollLocker } from '../../../../commons/window-scroll-block';
import { FloorCount } from './floor-count';
import { HttpClient } from '@angular/common/http';
import { PlatformDetectService } from '../../../../platform-detect.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { FloorService } from './floor.service';
import { Observable } from 'rxjs';
import { ObjectFlatsService } from '../object-flats.service';
import { IObjectSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-flats-floor-page',
    templateUrl: './floor.component.html',
    styleUrls: ['./floor.component.scss', '../object-flats.component.scss'],
    providers: [
        WindowScrollLocker,
        FloorService
    ],
    encapsulation: ViewEncapsulation.None,
    // changeDetection: ChangeDetectionStrategy.OnPush,
})

export class FloorComponent implements OnInit, OnDestroy {

    public floorSelector: number[] = [];
    public floorCount = FloorCount;
    public housesBtnList: any[] = [];
    public floorSvg = '';
    public routerEvents: any;
    public jk: IObjectSnippet;
    public houseNumber: string;
    public sectionNumber: number;
    public floorNumber: number;
    public infoWindow: IFlatWithDiscount;
    public showApartmentWindow = false;
    public selectedFlatIndex: number;
    public floorFlats: IFlatWithDiscount[];

    constructor(
        public windowScrollLocker: WindowScrollLocker,
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public platform: PlatformDetectService,
        public http: HttpClient,
        public floorService: FloorService,
        private flatsDiscountService: FlatsDiscountService,
        private objectFlatsService: ObjectFlatsService
    ) {}

    public ngOnInit() {
        this.floorService.getFlatsDataByObjectId(this.objectFlatsService.getId()).subscribe(
            (data) => {
                this.objectFlatsService.setData(data);
                this.housesBtnList = this.objectFlatsService.getData().housesBtnList;
                this.jk = data.jk;
                this.floorCount = data.floorCount;
                this.routerEvents = this.routerChange();
            },
            (err) => {
                this.router.navigate(['/error-404'], { skipLocationChange: true });
                console.log(err);
            }
        );
    }

    public routerChange() {
        return this.activatedRoute.params
        .subscribe((params: any) => {
            // ???????????????? ???? ???????????????????????? ????????, ???????????? ?? ?????????? ???? ?????????????? ./floor-count.ts
            if (this.floorCount[params.house] && this.floorCount[params.house][params.section]
                && this.floorCount[params.house][params.section].some((floor) => floor === Number(params.floor))) {
                this.houseNumber = params.house;
                this.sectionNumber = Number(params.section);
                this.floorNumber = Number(params.floor);
                this.floorSelector = this.floorCount[this.houseNumber][this.sectionNumber];
                this.getFloorSvg(`/assets/floor-plans/jk_${this.jk.mod}/house_${this.houseNumber}/section_${this.sectionNumber}/floor_${this.floorNumber}/sect_${this.sectionNumber}_fl_${this.floorNumber}.svg`)  // ???????????????? ??????
                .subscribe(
                    (data: string) => {
                        this.floorSvg = data;
                        this.floorSvg = this.floorSvg.slice(1, 4) !== 'svg' ? '' : this.floorSvg;

                        this.floorService.getFlats({
                            mod: this.jk.mod,
                            houses: this.houseNumber + '',
                            sections: this.sectionNumber + '',
                            floor: this.floorNumber + ''
                        }).subscribe(
                            (flats: IAddressItemFlat[]) => {
                                const discountizatedFlats = flats.map((flat: IFlatWithDiscount) => {flat.discount = this.flatsDiscountService.getDiscount(flat); return flat; });
                                if ( this.platform.isBrowser ) {
                                    this.floorService.flatsHover(discountizatedFlats, {
                                        click: (i) => this.openApartmentModal(i, discountizatedFlats),
                                        hover: (flat) => this.infoWindow = flat
                                    });
                                }
                            },
                            (err) => {
                                console.log(err);
                            }
                        );
                    },
                    (err) => {
                        this.floorSvg = '';
                        console.log(err);
                    }
                );
            } else {
                this.router.navigate(['/error-404'], { skipLocationChange: true });
            }
        });
    }

    public ngOnDestroy() {
        if (this.routerEvents) {
            this.routerEvents.unsubscribe();
        }
    }

    public getFloorSvg(url): Observable<string> {
        return this.http.get<string>(url, { responseType: 'text' as 'json' });
    }

    public openApartmentModal(index, floorFlats) {
        this.selectedFlatIndex = index;
        this.floorFlats = floorFlats;
        this.windowScrollLocker.block();
        this.showApartmentWindow = true;
    }
}
