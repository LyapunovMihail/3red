import { Component, OnInit } from '@angular/core';
import { IAddressItemFlat } from '../../../../serv-files/serv-modules/addresses-api/addresses.interfaces';
import { HomeFilterService } from './home-filter.service';

@Component({
    selector: 'app-home-item-filter',
    templateUrl: 'home-filter.component.html',
    styleUrls: ['home-filter.component.scss'],
    providers: [
        HomeFilterService
    ]
})

export class HomeFilterComponent implements OnInit {

    public flatsLength: number;
    public availableFlats: IAddressItemFlat[];

    constructor(
        public homeFilterService: HomeFilterService
    ) { }

    ngOnInit() {
        this.getFlats();
    }

    public getFlats() {
        this.homeFilterService.getFlats({type: 'КВ,АП'}).subscribe(
            (data: IAddressItemFlat[]) => {
                this.availableFlats = data.filter((flat: IAddressItemFlat) => flat.statusName === 'Свободно');
                this.flatsLength = data.length;
                console.log('this.flatsLength: ', this.flatsLength);
            },
            (err) => {
                console.log(err);
            }
        );
    }

    public parseText(num) {

        num = Math.abs(num) % 100;
        const words = ['предложение', 'предложения', 'предложений'];
        const sum = num % 10;

        if (num > 10 && num < 20) { return words[2]; }
        if (sum > 1 && sum < 5) { return words[1]; }
        if (sum === 1) { return words[0]; }
        return words[2];
    }
}
