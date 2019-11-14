import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { FloorCount } from '../../flats/floor/floor-count';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreroomsService } from '../storerooms.service';
import { PlatformDetectService } from '../../platform-detect.service';
import { WindowScrollLocker } from '../../commons/window-scroll-block';

@Component({
    selector: 'app-storerooms-floor-page',
    templateUrl: './floor.component.html',
    styleUrls: ['./floor.component.scss'],
    providers : [
        StoreroomsService,
        WindowScrollLocker
    ],
    encapsulation: ViewEncapsulation.None,
})

export class FloorComponent implements OnInit, OnDestroy {

    public routerEvents: any;
    public sectionNumber: number;
    public floorNumber: number;
    public floorCount = FloorCount;
    public floorSvg: string = '';
    public storeroomData: IAddressItemFlat;
    public infoWindow: IAddressItemFlat;
    public isRequestWindowOpen: boolean = false;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public http: HttpClient,
        private storeroomsService: StoreroomsService,
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
                if ( (Number(params['section']) === 1 && Number(params['floor']) === 1) ||
                    (Number(params['section']) >= 2 && Number(params['section']) <= 4 && Number(params['floor']) === 0)) {
                    this.sectionNumber = Number(params['section']);
                    this.floorNumber = Number(params['floor']);
                    this.getFloorSvg(`/assets/floor-plans/section_${this.sectionNumber}/floor_${this.floorNumber}/sect_${this.sectionNumber}_fl_${this.floorNumber}.svg`)
                        .subscribe(
                            (data: string) => {
                                this.floorSvg = data;
                                this.storeroomsService.getObjects({
                                    sections: this.sectionNumber + '',
                                   // floor: this.floorNumber + '',
                                    type: 'КЛ'
                                }).subscribe(
                                    (flats: IAddressItemFlat[]) => {
                                        if ( this.platform.isBrowser ) {
                                            this.storeroomsService.flatsHover(flats, {
                                                hover: (flat) => this.infoWindow = flat,
                                                click: (flat) => { this.storeroomData = flat;  this.isRequestWindowOpen = true; }
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
