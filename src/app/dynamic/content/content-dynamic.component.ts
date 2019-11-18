import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-content-dynamic',
    templateUrl: 'content-dynamic.component.html',
    styleUrls: ['content-dynamic.component.scss']
})

export class ContentDynamicComponent implements OnInit {

    public onBlock = false;

    constructor() { }

    ngOnInit() { }
}
