import { Router } from '@angular/router';
import { PlatformDetectService } from './../../../platform-detect.service';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-apartment-side-bar',
    templateUrl: './apartment-side-bar.component.html',
    styleUrls: ['./apartment-side-bar.component.scss']
})

export class ApartmentSideBarComponent {

    @Input() public sectionNumber;
    @Input() public apartmentNumber;
    @Input() public floorNumber;

    @Output() public svgClick: EventEmitter<any> = new EventEmitter();

    constructor(
        public router: Router,
        public platform: PlatformDetectService
    ) { }

    public writePreviousUrl () {
        if (this.platform.isBrowser) {
            localStorage.setItem('previousRoute', this.router.url);
            this.router.navigate(['/flats/search']);
        }
    }

}
