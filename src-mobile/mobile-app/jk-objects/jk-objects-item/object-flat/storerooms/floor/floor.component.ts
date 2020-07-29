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

    public storerooms;
    public outputStorerooms = [];
    public skip = 0;
    public showLoadBtn = true;

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
            // getSnippetsByParams
            this.storeroomsService.getFlats({
                _id: this.objectFlatsService.getId(),
                status: '4',
                type: 'КЛ'
            }).subscribe( data => {
                this.storerooms = data;
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
            if (this.skip < this.storerooms.length) {
                this.outputStorerooms.push(this.storerooms[this.skip++]);
            }
        }
        setTimeout( () => window.scrollTo(0,scrollPos) );
        this.showLoadBtn = this.skip < this.storerooms.length;
    }
    public scrollTop() {
        window.scrollTo(0,0);
    }

    public ngOnDestroy() {
        this.routerEvents.unsubscribe();
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
        this.storeroomData = data;
        this.windowScrollLocker.block();
        this.isRequestWindowOpen = true;
    }
}
