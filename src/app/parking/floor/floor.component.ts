import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorCount } from '../../flats/floor/floor-count';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ParkingService } from '../parking.service';
import { PlatformDetectService } from '../../platform-detect.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

@Component({
    selector: 'app-parking-floor-page',
    templateUrl: './floor.component.html',
    styleUrls: ['./floor.component.scss'],
    providers : [
        ParkingService,
        WindowScrollLocker
    ],
    encapsulation: ViewEncapsulation.None,
})

export class FloorComponent implements OnInit, OnDestroy {

    public routerEvents: any;
    public sectionNumber: string;
    public floorNumber: string;
    public floorCount = FloorCount;
    public floorSvg: string = '';
    public parkingData: IAddressItemFlat;
    public infoWindow: IAddressItemFlat;
    public isRequestWindowOpen: boolean = false;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public http: HttpClient,
        private parkingService: ParkingService,
        public platform: PlatformDetectService,
        public windowScrollLocker: WindowScrollLocker
    ) { }

    public ngOnInit() {
        this.routerEvents = this.routerChange();
    }

    public ngOnDestroy() {
        this.routerEvents.unsubscribe();
    }

    public routerChange() {
        return this.activatedRoute.params
            .subscribe((params: any) => {
                if ( (params['section'] === '1' && params['floor'] === '1') ||
                    (params['section'] === '2,3,4' && params['floor'] === '0')) {
                    this.sectionNumber = params['section'];
                    this.floorNumber = params['floor'];
                    this.getFloorSvg(`/assets/floor-plans/section_${this.sectionNumber}/floor_${this.floorNumber}/sect_${this.sectionNumber}_fl_${this.floorNumber}_parking.svg`)
                        .subscribe(
                            (data: string) => {
                                this.floorSvg = data;
                                this.parkingService.getObjects({
                                    // sections: this.sectionNumber + '',
                                    // floor: this.floorNumber + '',
                                    type: 'ММ'
                                }).subscribe(
                                    (flats: IAddressItemFlat[]) => {
                                        if ( this.platform.isBrowser ) {
                                            this.parkingService.flatsHover(flats, {
                                                hover: (flat) => this.infoWindow = flat,
                                                click: (flat) => { this.parkingData = flat;  this.isRequestWindowOpen = true; }
                                            });
                                        }
                                    },
                                    (err) => {
                                        console.log(err);
                                    }
                                );
                            },
                            (err) => {
                                this.floorSvg = `<div class="floor-plan-error-description">Для этого этажа изображение отсутствует</div>`;
                                console.log(err);
                            }
                        );
                } else {
                    this.router.navigate(['/error-404'], { skipLocationChange: true });
                }
            });
    }

    public getFloorSvg(url): Observable<string> {
        return this.http.get<string>(url, { responseType: 'text' as 'json' });
    }
}
