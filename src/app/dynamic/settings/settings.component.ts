import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-settings-dynamic',
    templateUrl: 'settings-dynamic.component.html',
    styleUrls: ['settings-dynamic.component.scss']
})

export class SettingsDynamicComponent implements OnInit {

    public onDynamic = false;
    public onHouse = false;

    constructor() { }

    ngOnInit() { }
}