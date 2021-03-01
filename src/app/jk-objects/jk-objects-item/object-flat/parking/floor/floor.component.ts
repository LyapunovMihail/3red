import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ParkingService } from '../parking.service';
import { PlatformDetectService } from '../../../../../platform-detect.service';
import { WindowScrollLocker } from '../../../../../commons/window-scroll-block';
import { JkObjectsListService } from '../../../../jk-objects-list/jk-objects-list.service';
import { ObjectFlatsService } from '../../object-flats.service';
import { IObjectSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-parking-floor-page',
    templateUrl: './floor.component.html',
    styleUrls: ['./floor.component.scss'],
    providers : [
        ParkingService,
        WindowScrollLocker,
        JkObjectsListService
    ],
    encapsulation: ViewEncapsulation.None,
})

export class FloorComponent implements OnInit, OnDestroy {

    public routerEvents: any;
    public houseNumber: string;
    public sectionNumber: string;
    public floorNumber: string;
    public floorSvg = '';
    public parkingData: IAddressItemFlat;
    public infoWindow: IAddressItemFlat;
    public isRequestWindowOpen = false;
    public jk: IObjectSnippet;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public http: HttpClient,
        private parkingService: ParkingService,
        public platform: PlatformDetectService,
        public windowScrollLocker: WindowScrollLocker,
        private jkObjectsItemService: JkObjectsListService,
        private objectFlatsService: ObjectFlatsService
    ) { }

    public ngOnInit() {
        this.jkObjectsItemService.getSnippets(this.objectFlatsService.getId())
            .subscribe(
                (data) => {
                    this.jk = data[0];
                    this.routerEvents = this.routerChange();
                },
                (err) => console.error(err)
            );
    }

    public ngOnDestroy() {
        if (this.routerEvents) {
            this.routerEvents.unsubscribe();
        }
    }

    public routerChange() {
        return this.activatedRoute.params
            .subscribe((params: any) => {
                // if ( (params['section'] === '1' && params['floor'] === '1') ||
                //     (params['section'] === '2,3,4' && params['floor'] === '0')) {
                    this.houseNumber = params['house'];
                    this.sectionNumber = params['section'];
                    this.floorNumber = params['floor'];
                    this.getFloorSvg(`/assets/floor-plans/jk_${this.jk.mod}/house_${this.houseNumber}/section_${this.sectionNumber}/floor_${this.floorNumber}/sect_${this.sectionNumber}_fl_${this.floorNumber}_parking.svg`)
                        .subscribe(
                            (data: string) => {
                                this.floorSvg = data;
                                this.parkingService.getFlats({
                                    house: this.houseNumber,
                                    sections: this.sectionNumber,
                                    floor: this.floorNumber,
                                    mod: this.jk.mod,
                                    type: 'ММ',
                                }).subscribe(
                                    (flats: IAddressItemFlat[]) => {
                                        if ( this.platform.isBrowser ) {
                                            this.parkingService.flatsHover(flats, {
                                                hover: (flat) => this.infoWindow = flat,
                                                click: (flat) => { this.parkingData = flat; this.isRequestWindowOpen = true; }
                                            });
                                        }
                                    },
                                    (err) => {
                                        console.log(err);
                                    }
                                );
                            },
                            (err) => {
                                this.floorSvg = null;
                                console.log(err);
                            }
                        );
                // } else {
                //     this.router.navigate(['/error-404'], { skipLocationChange: true });
                // }
            });
    }

    public getFloorSvg(url): Observable<string> {
        return this.http.get<string>(url, { responseType: 'text' as 'json' });
    }
}
