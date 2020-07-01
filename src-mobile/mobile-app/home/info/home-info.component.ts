import { Component, OnInit } from '@angular/core';
import { HomeInfoService } from './home-info.service';
import { IHomeInfoSnippet } from '../../../../serv-files/serv-modules/home/info-api/home-info.interfaces';

@Component({
    selector: 'app-home-info',
    templateUrl: 'home-info.component.html',
    styleUrls: [
        'home-info.component.scss'
    ],
    providers: [
        HomeInfoService
    ]
})

export class HomeInfoComponent implements OnInit {

    public snippet: IHomeInfoSnippet;

    constructor(
        private homeInfoService: HomeInfoService
    ) {}

    ngOnInit() {
        this.homeInfoService.getSnippet()
            .subscribe(
                (data) => this.snippet = data,
                (err) => console.error(err)
            );
    }


}
