import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WindowScrollLocker } from '../../../../../commons/window-scroll-block';

@Component({
    selector: 'app-dynamic-admin-settings',
    templateUrl: 'dynamic-admin-settings.component.html',
    styleUrls: ['dynamic-admin-settings.component.scss'],
    providers: [ WindowScrollLocker ]
})

export class DynamicAdminSettingsComponent implements OnInit {

    public onDynamic = false;
    public onHouse = false;
    @Output() public showSettingsAdmin = new EventEmitter<boolean>();
    closeSetting(incrased: any) {
        this.showSettingsAdmin.emit(incrased);
    }

    constructor( private scrollLock: WindowScrollLocker ) { }

    ngOnInit() { this.scrollLock.block(); }
}
