import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { WindowScrollLocker } from '../../../../../commons/window-scroll-block';

@Component({
    selector: 'app-dynamic-admin-content',
    templateUrl: 'dynamic-admin-content.component.html',
    styleUrls: ['dynamic-admin-content.component.scss'],
    providers: [ WindowScrollLocker ]
})

export class DynamicAdminContentComponent implements OnInit {

    @Output() public showContentAdmin = new EventEmitter<boolean>();
    closeContent(incrased: any) {
        this.showContentAdmin.emit(incrased);
    }

    constructor( private scrollLock: WindowScrollLocker ) { }

    ngOnInit() { this.scrollLock.block(); }
}
