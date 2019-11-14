import { Component } from '@angular/core';
import { HouseService } from '../../flats/house/house.service';

@Component({
    selector: 'app-shares-component',
    templateUrl: './shares.component.html',
    styleUrls: ['./shares.component.scss'],
    providers: [HouseService]
})
export class SharesComponent  {

}
