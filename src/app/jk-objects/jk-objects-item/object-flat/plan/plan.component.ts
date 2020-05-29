import { Component, Input, OnInit } from '@angular/core';
import { placement, mockHouse } from './plan.config';
import { PlanService } from './plan.service';
import { IObjectFlatSnippet } from '../../../../../../serv-files/serv-modules/jk-objects/flat-api/objects-flat.interfaces';
import { IAddressItemFlat } from '../../../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';

@Component({
    selector: 'app-object-item-flat',
    templateUrl: 'plan.component.html',
    styleUrls: [
        'plan.component.scss',
        '../../jk-objects-item.component.scss'
    ],
    providers: [PlanService]
})

export class PlanComponent implements OnInit {

    @Input()
    public isAuthorizated = false;
    @Input()
    public objectId: string;
    @Input()
    public mod: string;

    public genplanPlacement = placement;
    public tempHouse = mockHouse;

    public selectNavPoint = '';
    public snippet: IObjectFlatSnippet;
    public switchOn = false;

    public flats: IAddressItemFlat[] = [];
    public storerooms: IAddressItemFlat[] = [];
    public parking: IAddressItemFlat[] = [];

    public activeTab = 'flats';

    constructor(
        private flatService: PlanService,
    ) { }

    ngOnInit() {
        this.flatService.getSnippetById(this.objectId).subscribe((data) => {
            this.snippet = data;
            if (this.snippet) {
                this.switchOn = this.snippet.switchOn;
                if (this.switchOn) {
                    this.getPlacements();
                }
            }
        }, (error) => {
            console.error(error);
        });
    }

    getPlacements() {
        this.flatService.getFlats({ // запрос кладовых
            mod: this.mod,
            type: 'КЛ'
        }).subscribe(
            (storerooms) => {
                this.storerooms = storerooms;
            },
            (err) => console.error(err)
        );

        this.flatService.getFlats({ // запрос машиномест
            mod: this.mod,
            type: 'ММ'
        }).subscribe(
            (parking) => {
                this.parking = parking;
            },
            (err) => console.error(err)
        );
    }

    public changeTab(tabName) {
        // ToDo тут будет логика парсинга данных из машиномест, кладовых и квартир в данные маркеров
        this.activeTab = tabName;
    }

    public switchBlock($event) {
        this.switchOn = $event.target.checked;
        const data = {...this.snippet, objectId: this.objectId, switchOn: this.switchOn};
        this.flatService.setSnippetData(data).subscribe(
            () => console.log('success'),
            (err) => console.error(err)
        );
    }
}
