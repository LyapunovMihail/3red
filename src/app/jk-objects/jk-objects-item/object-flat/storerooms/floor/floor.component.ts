import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { IAddressItemFlat } from '../../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StoreroomsService } from '../storerooms.service';
import { PlatformDetectService } from '../../../../../platform-detect.service';
import { WindowScrollLocker } from '../../../../../commons/window-scroll-block';
import { JkObjectsListService } from '../../../../jk-objects-list/jk-objects-list.service';
import { ObjectFlatsService } from '../../object-flats.service';
import { IObjectSnippet } from '../../../../../../../serv-files/serv-modules/jk-objects/object-api/objects.interfaces';

@Component({
    selector: 'app-storerooms-floor-page',
    templateUrl: './floor.component.html',
    styleUrls: ['./floor.component.scss'],
    providers : [
        StoreroomsService,
        WindowScrollLocker,
        JkObjectsListService
    ],
    encapsulation: ViewEncapsulation.None,
})

export class FloorComponent implements OnInit, OnDestroy {

    public routerEvents: any;
    public houseNumber: string;
    public sectionNumber: number;
    public floorNumber: number;
    public floorSvg = '';
    public storeroomData: IAddressItemFlat;
    public infoWindow: IAddressItemFlat;
    public isRequestWindowOpen = false;
    public jk: IObjectSnippet;

    constructor(
        public router: Router,
        public activatedRoute: ActivatedRoute,
        public http: HttpClient,
        private storeroomsService: StoreroomsService,
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
                // if ( (Number(params['section']) === 1 && Number(params['floor']) === 1) ||
                //     (Number(params['section']) >= 2 && Number(params['section']) <= 4 && Number(params['floor']) === 0)) {
                    this.houseNumber = params['house'];
                    this.sectionNumber = params['section'];
                    this.floorNumber = params['floor'];
                    this.getFloorSvg(`/assets/floor-plans/jk_${this.jk.mod}/house_${this.houseNumber}/section_${this.sectionNumber}/floor_${this.floorNumber}/sect_${this.sectionNumber}_fl_${this.floorNumber}_storeroom.svg`)
                        .subscribe(
                            (data: string) => {
                                this.floorSvg = data;
                                this.storeroomsService.getFlats({
                                    house: this.houseNumber,
                                    sections: this.sectionNumber,
                                    floor: this.floorNumber,
                                    mod: this.jk.mod,
                                    type: '????',
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
