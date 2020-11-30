import { Component, Input, OnInit } from '@angular/core';
import { HomeInfoService } from './home-info.service';
import { IHomeInfoSnippet } from '../../../../serv-files/serv-modules/home/info-api/home-info.interfaces';
import { ViewportScroller } from '@angular/common';

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
        private homeInfoService: HomeInfoService,
        public viewPortScroller: ViewportScroller
    ) {}

    ngOnInit() {
        this.homeInfoService.getSnippet()
            .subscribe(
                (data) => this.snippet = data,
                (err) => console.error(err)
            );
    }

    toCareer() {
        setTimeout(() => {
            this.viewPortScroller.scrollToAnchor('career');
        }, 180);
    }
}
