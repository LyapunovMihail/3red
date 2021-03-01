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

    public parking;
    public outputParking = [];
    public skip = 0;
    public showLoadBtn = true;

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
        this.parkingService.getFlats({
            _id: this.objectFlatsService.getId(),
            status: '4',
            type: 'ММ'
        }).subscribe( data => {
            this.parking = data;
            this.loadMore();
        });

        this.jkObjectsItemService.getSnippets(this.objectFlatsService.getId())
            .subscribe(
                (data) => {
                    this.jk = data[0];
                    this.routerEvents = this.routerChange();
                },
                (err) => console.error(err)
            );
    }

    public loadMore() {
        const scrollPos = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        for (let i = 0; i < 10; i++) {
            if (this.skip < this.parking.length) {
                this.outputParking.push(this.parking[this.skip++]);
            }
        }
        setTimeout( () => window.scrollTo(0, scrollPos) );
        this.showLoadBtn = this.skip < this.parking.length;
    }
    public scrollTop() {
        window.scrollTo(0, 0);
    }

    public ngOnDestroy() {
        if (this.routerEvents) {
            this.routerEvents.unsubscribe();
        }
    }

    public routerChange() {
        return this.activatedRoute.params
            .subscribe((params: any) => {
                this.houseNumber = params['house'];
                this.sectionNumber = params['section'];
                this.floorNumber = params['floor'];
            });
    }

    public getFloorSvg(url): Observable<string> {
        return this.http.get<string>(url, { responseType: 'text' as 'json' });
    }

    public openModal(data) {
        this.parkingData = data;
        this.windowScrollLocker.block();
        this.isRequestWindowOpen = true;
    }
}
