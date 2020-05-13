import { Component, Input, OnInit } from '@angular/core';
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

    @Input()
    isAuthorizated: boolean;

    public snippet: IHomeInfoSnippet;
    public closeModal = true;

    constructor(
        private homeInfoService: HomeInfoService
    ) {}

    ngOnInit() {
        this.homeInfoService.getSnippet()
            .subscribe(
                (data) => { this.snippet = data; console.log('this.snippet: ', this.snippet); },
                (err) => console.error(err)
            );
    }


}
